    // All data is kept in the browser, so this demo works without a server or database.
    let stock = JSON.parse(localStorage.getItem('officeStock')) || [];
    let movements = JSON.parse(localStorage.getItem('officeMovements')) || [];
    const adminEmail = 'lidyabutiku5@gmail.com';
    const adminPassword = '123';

    // Item reference numbers mapping
    const itemReferences = {
      'Laptop': 'REF-001',
      'Desktop computer': 'REF-002',
      'Monitor': 'REF-003',
      'Keyboard': 'REF-004',
      'Mouse': 'REF-005',
      'Tablet': 'REF-006',
      'Server': 'REF-007',
      'Webcam': 'REF-008',
      'Headset': 'REF-009',
      'Computer speakers': 'REF-010',
      'UPS': 'REF-011',
      'External hard drive': 'REF-012',
      'Flash drive': 'REF-013',
      'Wi-Fi router': 'REF-014',
      'Network switch': 'REF-015',
      'Projector': 'REF-016'
    };

    const stockTable = document.getElementById('stockTable');
    const historyTable = document.getElementById('historyTable');
    const message = document.getElementById('message');

    function showApp() {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('appShell').classList.add('visible');
    }

    document.getElementById('loginForm').addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      if (email === adminEmail && password === adminPassword) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showApp();
      } else {
        document.getElementById('loginMessage').textContent = 'Incorrect email or password.';
      }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
      sessionStorage.removeItem('adminLoggedIn');
      window.location.reload();
    });

    function saveData() {
      localStorage.setItem('officeStock', JSON.stringify(stock));
      localStorage.setItem('officeMovements', JSON.stringify(movements));
    }

    function showMessage(text) {
      message.textContent = text;
      setTimeout(() => { message.textContent = ''; }, 3000);
    }

    function addMovement(action, item, details) {
      movements.unshift({ date: new Date().toLocaleString(), action, item, details });
    }

    function render() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const visibleStock = stock.filter(item => item.name.toLowerCase().includes(search));
      stockTable.innerHTML = visibleStock.map(item => {
        const holders = item.issuedTo.map(person => `${person.employee} (${person.department})`).join(', ');
        const ref = itemReferences[item.name] || item.reference || 'N/A';
        return `<tr><td><strong>${item.name}</strong></td><td>${ref}</td><td>${item.available}</td><td>${item.issuedTo.length}</td><td>${holders || 'None'}</td><td><button class="edit-item-button" data-item="${encodeURIComponent(item.name)}" type="button">Edit</button><button class="clear-item-button" data-item="${encodeURIComponent(item.name)}" type="button">Clear</button></td></tr>`;
      }).join('');
      document.getElementById('emptyStock').style.display = visibleStock.length ? 'none' : 'block';
      historyTable.innerHTML = movements.map((move, index) => `<tr><td>${move.date}</td><td><span class="action-badge">${move.action}</span></td><td>${move.item}</td><td>${move.details}</td><td><button class="edit-item-button" data-movement-index="${index}" type="button">Edit</button><button class="clear-item-button" data-movement-index="${index}" type="button">Clear</button></td></tr>`).join('');
      document.getElementById('emptyHistory').style.display = movements.length ? 'none' : 'block';
      document.getElementById('totalItems').textContent = stock.reduce((sum, item) => sum + item.available + item.issuedTo.length, 0);
      document.getElementById('availableItems').textContent = stock.reduce((sum, item) => sum + item.available, 0);
      document.getElementById('issuedItems').textContent = stock.reduce((sum, item) => sum + item.issuedTo.length, 0);
      document.getElementById('movementCount').textContent = movements.length;
      updateItemLists();
    }

    function updateItemLists() {
      const issueItem = document.getElementById('issueItem');
      const returnItem = document.getElementById('returnItem');
      issueItem.innerHTML = stock.filter(item => item.available > 0).map(item => `<option value="${item.name}">${item.name} (${item.available} available)</option>`).join('');
      returnItem.innerHTML = stock.filter(item => item.issuedTo.length > 0).map(item => `<option value="${item.name}">${item.name} (${item.issuedTo.length} issued)</option>`).join('');
    }

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.equipment-form').forEach(form => form.classList.remove('active-form'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.form).classList.add('active-form');
      });
    });

    // Auto-populate reference number when item is selected
    document.getElementById('receiveName').addEventListener('change', function() {
      const selectedItem = this.value;
      const referenceField = document.getElementById('receiveReference');
      if (selectedItem && itemReferences[selectedItem]) {
        referenceField.value = itemReferences[selectedItem];
      } else {
        referenceField.value = '';
      }
    });

    document.getElementById('receiveForm').addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('receiveName').value.trim();
      const quantity = Number(document.getElementById('receiveQuantity').value);
      const reference = document.getElementById('receiveReference').value.trim() || itemReferences[name] || 'No reference';
      if (!name) return showMessage('Please select an item.');
      let item = stock.find(entry => entry.name.toLowerCase() === name.toLowerCase());
      if (item) {
        item.available += quantity;
        if (!item.reference) item.reference = reference;
      } else {
        item = { name, available: quantity, issuedTo: [], reference };
        stock.push(item);
      }
      addMovement('Received', name, `${quantity} item(s), ${reference}`);
      saveData(); render(); event.target.reset(); document.getElementById('receiveQuantity').value = 1; showMessage('Stock received successfully.');
    });

    document.getElementById('issueForm').addEventListener('submit', event => {
      event.preventDefault();
      const selectedItems = Array.from(document.getElementById('issueItem').selectedOptions).map(option => option.value);
      const employee = document.getElementById('issueEmployee').value.trim();
      const department = document.getElementById('issueDepartment').value;
      if (!department) return showMessage('Please select a department.');
      if (!selectedItems || selectedItems.length === 0) return showMessage('Please select at least one item.');
      
      let issuedCount = 0;
      for (const name of selectedItems) {
        const item = stock.find(entry => entry.name === name);
        if (item && item.available > 0) {
          item.available -= 1;
          item.issuedTo.push({ employee, department });
          addMovement('Issued', name, `To ${employee}, ${department}`);
          issuedCount++;
        }
      }
      
      if (issuedCount === 0) {
        showMessage('No selected items are available.');
      } else if (issuedCount === selectedItems.length) {
        saveData(); render(); event.target.reset(); showMessage(`${issuedCount} item(s) issued successfully.`);
      } else {
        saveData(); render(); event.target.reset(); showMessage(`${issuedCount} out of ${selectedItems.length} items issued (some may have been unavailable).`);
      }
    });

    document.getElementById('returnForm').addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('returnItem').value;
      const condition = document.getElementById('returnCondition').value;
      const department = document.getElementById('returnDepartment').value;
      const note = document.getElementById('returnNote').value.trim() || 'No note';
      if (!department) return showMessage('Please select a department.');
      const item = stock.find(entry => entry.name === name);
      if (!item || item.issuedTo.length < 1) return showMessage('There is no issued item to return.');
      const holder = item.issuedTo.shift();
      if (condition === 'Good') item.available += 1;
      addMovement('Returned', name, `From ${holder.employee} (${department}), ${condition}: ${note}`);
      saveData(); render(); event.target.reset(); showMessage(condition === 'Good' ? 'Item returned to stock.' : 'Damaged item recorded.');
    });

    document.getElementById('searchInput').addEventListener('input', render);
    
    // Edit modal functionality
    let currentEditingItem = null;
    let editingItemPeople = [];
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const editItemName = document.getElementById('editItemName');
    const editItemQuantity = document.getElementById('editItemQuantity');
    const editPeopleList = document.getElementById('editPeopleList');
    const editPersonEmployee = document.getElementById('editPersonEmployee');
    const editPersonDepartment = document.getElementById('editPersonDepartment');
    const addPersonButton = document.getElementById('addPersonButton');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditModal = document.getElementById('cancelEditModal');

    function renderPeopleList() {
      editPeopleList.innerHTML = editingItemPeople.map((person, index) => `
        <div class="person-item">
          <div class="person-item-name">
            ${person.employee}
            <span class="person-item-dept">(${person.department})</span>
          </div>
          <button class="remove-person-button" data-person-index="${index}" type="button">Remove</button>
        </div>
      `).join('');
      
      document.querySelectorAll('.remove-person-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const index = Number(btn.dataset.personIndex);
          editingItemPeople.splice(index, 1);
          renderPeopleList();
        });
      });
    }

    function openEditModal(itemName) {
      currentEditingItem = stock.find(entry => entry.name === itemName);
      if (!currentEditingItem) return;
      editItemName.value = currentEditingItem.name;
      editItemQuantity.value = currentEditingItem.available;
      editingItemPeople = JSON.parse(JSON.stringify(currentEditingItem.issuedTo));
      renderPeopleList();
      editPersonEmployee.value = '';
      editPersonDepartment.value = '';
      editModal.classList.add('active');
    }

    function closeEditModalFunc() {
      editModal.classList.remove('active');
      currentEditingItem = null;
      editingItemPeople = [];
      editForm.reset();
    }

    addPersonButton.addEventListener('click', (e) => {
      e.preventDefault();
      const employee = editPersonEmployee.value.trim();
      const department = editPersonDepartment.value;
      if (!employee || !department) {
        showMessage('Please enter employee name and select a department.');
        return;
      }
      editingItemPeople.push({ employee, department });
      editPersonEmployee.value = '';
      editPersonDepartment.value = '';
      renderPeopleList();
    });

    closeEditModal.addEventListener('click', closeEditModalFunc);
    cancelEditModal.addEventListener('click', closeEditModalFunc);

    editForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!currentEditingItem) return;
      const oldName = currentEditingItem.name;
      const oldQuantity = currentEditingItem.available;
      const oldPeople = JSON.stringify(currentEditingItem.issuedTo);
      const newName = editItemName.value.trim();
      const newQuantity = Number(editItemQuantity.value);

      if (newQuantity < 0) {
        showMessage('Quantity cannot be negative.');
        return;
      }

      const changes = [];
      if (oldName !== newName) {
        currentEditingItem.name = newName;
        changes.push(`Name: ${oldName} → ${newName}`);
      }
      if (oldQuantity !== newQuantity) {
        const quantityDiff = newQuantity - oldQuantity;
        currentEditingItem.available = newQuantity;
        changes.push(`Available: ${oldQuantity} → ${newQuantity}`);
      }
      if (oldPeople !== JSON.stringify(editingItemPeople)) {
        currentEditingItem.issuedTo = editingItemPeople;
        const peopleList = editingItemPeople.map(p => `${p.employee} (${p.department})`).join('; ') || 'None';
        changes.push(`People holding: ${peopleList}`);
      }

      if (changes.length > 0) {
        addMovement('Edited', currentEditingItem.name, changes.join('; '));
        saveData();
        render();
        showMessage('Item edited successfully.');
      }
      closeEditModalFunc();
    });

    // Edit movement modal functionality
    let currentEditingMovement = null;
    const editMovementModal = document.getElementById('editMovementModal');
    const editMovementForm = document.getElementById('editMovementForm');
    const editMovementItem = document.getElementById('editMovementItem');
    const editMovementDetails = document.getElementById('editMovementDetails');
    const closeEditMovementModal = document.getElementById('closeEditMovementModal');
    const cancelEditMovementModal = document.getElementById('cancelEditMovementModal');

    function openEditMovementModal(index, movement) {
      currentEditingMovement = { index, movement };
      editMovementItem.value = movement.item;
      editMovementDetails.value = movement.details;
      editMovementModal.classList.add('active');
    }

    function closeEditMovementModalFunc() {
      editMovementModal.classList.remove('active');
      currentEditingMovement = null;
      editMovementForm.reset();
    }

    closeEditMovementModal.addEventListener('click', closeEditMovementModalFunc);
    cancelEditMovementModal.addEventListener('click', closeEditMovementModalFunc);

    editMovementForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!currentEditingMovement) return;
      const { index, movement } = currentEditingMovement;
      const newItem = editMovementItem.value.trim();
      const newDetails = editMovementDetails.value.trim();

      if (movement.item !== newItem || movement.details !== newDetails) {
        movement.item = newItem;
        movement.details = newDetails;
        saveData();
        render();
        showMessage('Movement edited successfully.');
      }
      closeEditMovementModalFunc();
    });

    stockTable.addEventListener('click', event => {
      if (event.target.classList.contains('edit-item-button')) {
        const itemName = decodeURIComponent(event.target.dataset.item);
        openEditModal(itemName);
        return;
      }
      if (!event.target.classList.contains('clear-item-button')) return;
      const itemName = decodeURIComponent(event.target.dataset.item);
      const item = stock.find(entry => entry.name === itemName);
      if (!item) return;
      const warning = item.issuedTo.length > 0
        ? `${itemName} is still issued to ${item.issuedTo.length} employee(s). Clear it anyway?`
        : `Clear ${itemName} from the current stock list?`;
      if (confirm(warning)) {
        stock = stock.filter(entry => entry.name !== itemName);
        saveData();
        render();
        showMessage(`${itemName} was cleared. Movement history was kept.`);
      }
    });

    historyTable.addEventListener('click', event => {
      if (event.target.classList.contains('edit-item-button')) {
        const movementIndex = Number(event.target.dataset.movementIndex);
        const movement = movements[movementIndex];
        if (!movement) return;
        openEditMovementModal(movementIndex, movement);
        return;
      }
      if (!event.target.classList.contains('clear-item-button')) return;
      const movementIndex = Number(event.target.dataset.movementIndex);
      const movement = movements[movementIndex];
      if (!movement) return;
      if (confirm(`Clear this ${movement.action.toLowerCase()} movement from history?`)) {
        movements.splice(movementIndex, 1);
        saveData();
        render();
        showMessage('Movement cleared. Stock was not changed.');
      }
    });

    if (sessionStorage.getItem('adminLoggedIn') === 'true') showApp();
    render();
