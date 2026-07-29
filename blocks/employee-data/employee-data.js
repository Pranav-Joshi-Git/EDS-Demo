import { getMetadata } from '../../scripts/aem.js';

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // Get the JSON URL from the block content
  const link = block.querySelector('a');
  if (!link) return;

  const jsonUrl = link.href;
  const buttonLabel = 'Load More';

  // Fetch employee data
  let allEmployees = [];
  let currentOffset = 0;
  const pageSize = 10;

  try {
    const response = await fetch(jsonUrl);
    const result = await response.json();
    allEmployees = result.data || [];
  } catch (e) {
    console.error('Error fetching employee data:', e);
    return;
  }

  // Clear block content
  block.innerHTML = '';

  // Create employee list container
  const employeeList = document.createElement('div');
  employeeList.className = 'employee-list';
  block.appendChild(employeeList);

  // Function to render employee cards
  const renderEmployees = () => {
    const startIdx = currentOffset;
    const endIdx = Math.min(startIdx + pageSize, allEmployees.length);

    for (let i = startIdx; i < endIdx; i++) {
      const employee = allEmployees[i];
      
      const card = document.createElement('div');
      card.className = 'employee-card';

      const name = document.createElement('h3');
      name.className = 'employee-name';
      name.textContent = employee.Name;

      const department = document.createElement('p');
      department.className = 'employee-department';
      department.textContent = employee.Department;

      const details = document.createElement('div');
      details.className = 'employee-details';
      
      const experience = document.createElement('span');
      experience.className = 'employee-experience';
      experience.textContent = employee.Experience;

      const city = document.createElement('span');
      city.className = 'employee-city';
      city.textContent = employee.City;

      details.appendChild(experience);
      details.appendChild(city);

      card.appendChild(name);
      card.appendChild(department);
      card.appendChild(details);

      employeeList.appendChild(card);
    }

    currentOffset = endIdx;
  };

  // Render initial 10 employees
  renderEmployees();

  // Create load more button if there are more employees
  if (allEmployees.length > pageSize) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'employee-data-button-container';

    const button = document.createElement('button');
    button.textContent = buttonLabel;
    button.className = 'employee-data-load-more';

    button.addEventListener('click', () => {
      if (currentOffset < allEmployees.length) {
        renderEmployees();
      }
      // Hide button if no more rows
      if (currentOffset >= allEmployees.length) {
        button.style.display = 'none';
      }
    });

    buttonContainer.appendChild(button);
    block.appendChild(buttonContainer);
  }
}
