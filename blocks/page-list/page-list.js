/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // Get the JSON URL from block content or use default
  const link = block.querySelector('a');
  const jsonUrl = link ? link.href : '/query-index.json';

  // Fetch query index data
  let pages = [];

  try {
    console.log('Fetching from:', jsonUrl);
    const response = await fetch(jsonUrl);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Query index data:', result);
    pages = result.data || [];
  } catch (e) {
    console.error('Error fetching query index:', e);
    block.innerHTML = `<p>Unable to load page list. Error: ${e.message}</p><p>URL: ${jsonUrl}</p>`;
    return;
  }

  // Clear block content
  block.innerHTML = '';

  // Create page list container
  const pageGrid = document.createElement('div');
  pageGrid.className = 'page-grid';

  // Render each page as a card
  pages.forEach(page => {
    const card = document.createElement('article');
    card.className = 'page-card';

    // Add content section
    const content = document.createElement('div');
    content.className = 'page-card-content';

    // Add title as link
    if (page.title && page.path) {
      const title = document.createElement('h3');
      title.className = 'page-card-title';
      
      const titleLink = document.createElement('a');
      titleLink.href = page.path;
      titleLink.textContent = page.title;
      
      title.appendChild(titleLink);
      content.appendChild(title);
    }

    // Add description if available
    if (page.description) {
      const description = document.createElement('p');
      description.className = 'page-card-description';
      description.textContent = page.description;
      content.appendChild(description);
    }

    // Add date if available
    if (page.date) {
      const date = document.createElement('time');
      date.className = 'page-card-date';
      date.textContent = page.date;
      content.appendChild(date);
    }

    card.appendChild(content);
    pageGrid.appendChild(card);
  });

  block.appendChild(pageGrid);

  // Add count info
  if (pages.length > 0) {
    const info = document.createElement('p');
    info.className = 'page-list-info';
    info.textContent = `Showing ${pages.length} page${pages.length !== 1 ? 's' : ''}`;
    block.appendChild(info);
  }
}
