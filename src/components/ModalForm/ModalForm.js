import { Form, Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import globalContext from '../../context/context';

function ModalForm({
  handleClose,
  isShowForm,
  method,
  event
}) {
  const { dispatch } =  useContext(globalContext);

  const eventFetchHandler = (e) => {
    e.preventDefault();

    handleClose();

    if(method === 'Создать') {

      const body = {
        id: uuidv4(),
        title: e.target.title.value,
        description: e.target.description.value,
        time: event.format('X')
      };

      dispatch({ type: 'CREATE_EVENT', payload: body});

    } else {

      const body = {
        id: event.id,
        title: e.target.title.value,
        description: e.target.description.value,
        time: event.time
      };

      dispatch({ type: 'EDIT_EVENT', payload: body});
    }
  };

  const handleDelete = () => {
    handleClose();
    dispatch({ type: 'DELETE_EVENT', payload: event.id});
  };

  return (
    <Modal show={isShowForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{method} событие</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={eventFetchHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Событие</Form.Label>
            <Form.Control
              defaultValue={event ? event.title : ''}
              type="text"
              name="title"
              placeholder="Событие"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={event ? event.description : ''}
              rows={3}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          {' '}
          <Button variant="secondary" type="submit">
            {method}
          </Button>
          {' '}
          {
            method === 'Изменить' ? (
            <Button variant="danger" onClick={handleDelete}>Удалить</Button>
                  ) : null
                }

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
