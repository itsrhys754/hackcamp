// DatePickerComponent.js
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerComponent({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <Form>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </Col>
        <Col xs={12} md={6} className="mt-3 mt-md-0">
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </Col>
      </Row>
    </Form>
  );
}

export default DatePickerComponent;
