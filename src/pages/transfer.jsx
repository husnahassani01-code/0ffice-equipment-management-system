import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Dell Latitude 5440', serial: 'SN-998231', tag: 'TAG-8821', location: 'Main Store' },
  { id: 2, name: 'HP EliteBook 830', serial: 'SN9-110293', tag: 'TAG-5541', location: 'Branch Office' },
  { id: 3, name: 'Lenovo ThinkPad X1', serial: 'SN-110295', tag: 'TAG-5542', location: 'Remote Site' }
];

export default function EquipmentTransfer() {
  const [formData, setFormData] = useState({
    equipmentName: '',
    serialNumber: '',
    assetTagNumber: '',
    equipmentCondition: 'Good Working Condition',
    currentLocation: '',
    destinationLocation: '',
    transferType: 'Permanent',
    reasonForTransfer: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill fields when equipment is selected
    if (name === 'equipmentName') {
      const selectedProduct = products.find((product) => product.name === value);

      setFormData((prev) => ({
        ...prev,
        equipmentName: value,
        serialNumber: selectedProduct ? selectedProduct.serial : '',
        assetTagNumber: selectedProduct ? selectedProduct.tag : '',
        currentLocation: selectedProduct ? selectedProduct.location : ''
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted Data:', formData);
  };


  return (
  <div style={styles.container}>
    {/* Header */}
    <div style={styles.header}>
      <div>
        <span style={styles.subTitle}>INVENTORY MOVEMENT</span>
        <h1 style={styles.mainTitle}>Equipment Transfer</h1>
        <p style={styles.desc}>Log and track equipment relocation across sites.</p>
      </div>
      <div style={styles.badgeCard}>
        <span style={styles.badgeNumber}>5</span>
        <span style={styles.badgeText}>Transfers this month</span>
      </div>
    </div>


    <div style={styles.grid}>

      {/* Left Card: Form */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardSub}>NEW TRANSFER</span>
          <h2 style={styles.cardTitle}>Transfer Equipment</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Equipment Name</label>
            <select
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select Equipment</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Serial Number & Asset Tag */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="e.g. SN-998231"
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Asset Tag Number</label>
              <input
                type="text"
                name="assetTagNumber"
                value={formData.assetTagNumber}
                onChange={handleChange}
                placeholder="e.g. TAG-8821"
                style={styles.input}
              />
            </div>
          </div>

          {/* Condition */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Equipment Condition</label>
            <select
              name="equipmentCondition"
              value={formData.equipmentCondition}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Good Working Condition">Good Working Condition</option>
              <option value="Needs Maintenance">Needs Maintenance</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {/* Source & Destination */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Current Location (From)</label>
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="Main Store"
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Destination (To)</label>
              <input
                type="text"
                name="destinationLocation"
                value={formData.destinationLocation}
                onChange={handleChange}
                placeholder="HQ Office"
                style={styles.input}
              />
            </div>
          </div>

          {/* Type & Reason */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Transfer Type</label>
              <select
                name="transferType"
                value={formData.transferType}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Reason for Transfer</label>
              <input
                type="text"
                name="reasonForTransfer"
                value={formData.reasonForTransfer}
                onChange={handleChange}
                placeholder="Site Allocation"
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            Submit Transfer
          </button>
        </form>
      </div>

      {/* Right Card: Transfer History (Table / Column Format) */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardSub}>RECENT ACTIVITY</span>
          <h2 style={styles.cardTitle}>Transfer history</h2>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>S/N</th>
              <th style={styles.th}>Equipment</th>
              <th style={styles.th}>Route</th>
              <th style={styles.th}>Serial Number</th>
              <th style={styles.th}>TAG</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} style={styles.tableRow}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>
                  <span style={styles.itemTitle}>{product.name}</span>
                </td>
                <td style={styles.tdRoute}>
                  <span style={styles.itemTitle}>{product.location}</span>
                </td>
                <td style={styles.td}>{product.serial}</td>
                <td style={styles.td}>{product.tag}</td>
                <td style={styles.td}>
                  <span style={styles.tagCompleted}>Completed</span>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  </div >
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
    backgroundColor: '#f8f9fa'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '16px',
    marginBottom: '24px'

  },
  subTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#888',
    letterSpacing: '0.5px'
  },
  mainTitle: {
    fontSize: '28px',
    margin: '4px 0',
    color: '#111827'
  },
  desc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  badgeCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    padding: '10px 16px',
    borderRadius: '8px',
    textAlign: 'right'
  },
  badgeNumber: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827'
  },
  badgeText: {
    fontSize: '11px',
    color: '#6b7280'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    marginBottom: '16px'
  },
  cardSub: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#9ca3af'
  },
  cardTitle: {
    fontSize: '16px',
    margin: '2px 0 0 0',
    color: '#1f2937'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: '#fff'
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    backgroundColor: '#fff',

    outline: 'none'
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  // Style za Columns/Table katika Recent Activity
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    textAlign: 'left'
  },
  tableHeaderRow: {
    borderBottom: '2px solid #f3f4f6',
    fontWeight: '600',
  },
  th: {
    paddingBottom: '8px',
    color: '#1f2937',
    fontWeight: '600',
    fontSize: '11px'
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6'
  },
  td: {
    padding: '10px 0',
    verticalAlign: 'middle'
  },
  tdRoute: {
    padding: '10px 0',
    color: '#4b5563',
    fontSize: '11px',
    verticalAlign: 'middle'
  },
  itemTitle: {
    fontSize: '13px',
    color: '#111827',
    display: 'block'
  },
  itemSub: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '2px'
  },
  tagCompleted: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'inline-block'
  },
  tagPending: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'inline-block'
  }
};