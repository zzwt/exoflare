import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';

export default memo(({ selected }) => {
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnswers = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3005/answers/${selected.id}`
        );
        setAnswers(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (selected) getAnswers();
  }, [selected]);

  const renderAnswers = useCallback((answers) => {
    let score = 0;
    if (answers.speedingTickets) score += 3;
    if (!answers.vehicleServiced) score += 1;
    if (answers.consumedAlcohol) score += 2;
    return (
      <div>
        <Row>
          <Col span={18}>Questions</Col>
          <Col span={6}>Answers</Col>
        </Row>
        <Row>
          <Col span={18}>
            Have you had any speeding tickets in the last years?
          </Col>
          <Col span={6}>{answers.speedingTickets ? 'YES' : 'NO'}</Col>
        </Row>
        <Row>
          <Col span={18}>
            Has your vehicle been serviced in the last 6 months?
          </Col>
          <Col span={6}>{answers.vehicleServiced ? 'YES' : 'NO'}</Col>
        </Row>
        <Row>
          <Col span={18}>
            Have you consumed any alcohol in the last 6 hours?
          </Col>
          <Col span={6}>{answers.consumedAlcohol ? 'YES' : 'NO'}</Col>
        </Row>
        <Row>
          <Col span={24}>Risk Score: {score}</Col>
        </Row>
      </div>
    );
  }, []);

  if (!selected)
    return <div className="answers_container">Please Select a Driver</div>;

  if (error)
    return (
      <div className="answers_container">
        Failed fetching answers... Please try later.
      </div>
    );

  return <div className="answers_container">{renderAnswers(answers)}</div>;
});
