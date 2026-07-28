export default function decorate(block) {
	const list = document.createElement('ul');
	list.className = 'custom-cards-list';

	[...block.children].forEach((row) => {
		const cols = [...row.children];
		if (cols.length < 2) return;

		const item = document.createElement('li');

		const title = document.createElement('div');
		title.className = 'custom-cards-title';
		while (cols[0].firstChild) title.append(cols[0].firstChild);

		const body = document.createElement('div');
		body.className = 'custom-cards-body';
		while (cols[1].firstChild) body.append(cols[1].firstChild);

		body.querySelectorAll('a').forEach((link) => {
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
			const parent = link.parentElement;
			if (parent && parent.tagName === 'P' && parent.textContent.trim() === link.textContent.trim()) {
				parent.classList.add('custom-cards-cta');
			}
			link.classList.add('custom-cards-link');
		});

		item.append(title, body);
		list.append(item);
	});

	block.replaceChildren(list);
}
