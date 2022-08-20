import { useState } from 'react';
import { useContext } from 'react';
import globalContext from '../../context/context';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { Form, Button, Modal } from 'react-bootstrap';
import '../../styles/components/calendar.scss';

function Header({ today, nowDay }) {
  const { dispatch } =  useContext(globalContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = (e) => {
    e.preventDefault();

    handleClose();

    const body = {
      id: uuidv4(),
      title: e.target.title.value,
      description: e.target.description.value,
      time: moment().format('X')
    };

    dispatch({ type: 'CREATE_EVENT', payload: body});

  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать событие на сегодня</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Событие</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Событие"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>{' '}
            <Button variant="secondary" type="submit">
              Создать
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="calendar__header-wrap">
        <div className="calendar__header">
          <h1>Календарь на {today.format('YYYY')} год</h1>
          <button onClick={handleShow}>Добавить</button>
          <button onClick={nowDay}>Обновить</button>
          <div className="calendar__search">
            <i className="search-icon"></i>
            <input type="text" placeholder="Событие или описание" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
