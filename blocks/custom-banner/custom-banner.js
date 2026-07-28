export default function decorate(block) {
	[...block.children].forEach((row) => {
		const cols = [...row.children];
		if (cols.length < 2) return;

		const [mediaCol, contentCol] = cols;
		if (mediaCol.querySelector('picture, img')) {
			mediaCol.classList.add('custom-banner-media');
		}
		contentCol.classList.add('custom-banner-content');
	});
}
