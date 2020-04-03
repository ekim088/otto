// @flow

const defaultBlockTokens: { [string]: string } = {
	'\\(': '\\)',
	'{': '}',
	'\\[': '\\]',
	'<(?!\\/)': '\\/?>',
	'<\\/': '(?<!\\/)>'
};

const symmetricalTokens = ['"', "'"];

function isValidBlock(
	str: string,
	tokenMap: { [string]: string } = defaultBlockTokens
): boolean {
	const blockTokenStack: Array<string> = [];

	// build regex string
	let regExpStr = Object.entries(tokenMap).reduce(
		(accumulator: string, [key: string, value: mixed]): string =>
			`${accumulator}${accumulator && '|'}${key}|${String(value)}`,
		''
	);

	symmetricalTokens.forEach(token => {
		regExpStr = `${regExpStr}|${token}`;
	});

	const matches: ?Array<string> = str.match(new RegExp(regExpStr, 'gi'));

	// iterate over matches and make sure each block token has a matched end
	if (matches) {
		const symmetricalTokenStack: Array<string> = [];
		const openTokens = Object.keys(tokenMap);

		for (let i = 0; i < matches.length; i += 1) {
			if (symmetricalTokenStack.length > 0) {
				if (new RegExp(symmetricalTokenStack[0], 'g').test(matches[i])) {
					symmetricalTokenStack.pop();
				} else {
					return false;
				}
			} else {
				const tokenStart = openTokens.find((key: string) =>
					new RegExp(key, 'gi').test(matches[i])
				);

				if (tokenStart) {
					blockTokenStack.push(tokenMap[tokenStart]);
				} else {
					const stackEndIndex = blockTokenStack.length - 1;

					if (
						new RegExp(blockTokenStack[stackEndIndex], 'g').test(matches[i])
					) {
						blockTokenStack.pop();
					}
				}
			}
		}
	}

	return blockTokenStack.length === 0;
}

export function isValidHtml(str: string): boolean {
	// strip out tag text content before testing to avoid block tokens in text
	const strWithoutBlockText = str.replace(/(?<=>)(.*)(?=<\/)/g, '');

	return isValidBlock(strWithoutBlockText, {
		'<(?!\\/)': '\\/?>',
		'<\\/': '(?<!\\/)>'
	});
}

export default isValidHtml;
