const InvoiceNotes = ({ value, onChange }) => (
  <div>

    <textarea
      type="text"
      className="py-2 px-2 border rounded-md w-full"
      placeholder="Notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default InvoiceNotes;
