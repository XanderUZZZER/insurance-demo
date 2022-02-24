const Message = props => (
  <div style={{ background: '#eee', borderRadius: '5px', padding: '0 10px', color: 'green' }}>
    <p>
      <strong>{props.user}</strong> says:
    </p>
    <p>{props.message}</p>
  </div>
)

export default Message
