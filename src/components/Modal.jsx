export default function Modal({ setModalOpen, src }) {
  return (
    <div className="modal-overlay" onClick={() => setModalOpen(false)}>
      <div className="modal-content">
        <img src={src} alt="Full View" />
      </div>
    </div>
  );
}
