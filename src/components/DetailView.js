import React, { memo, useCallback } from 'react';
import { Row, Col } from 'antd';
import { useRequest } from '../request/useRequest';

export default memo(({ selected }) => {
  const { error, data: answers } = useRequest(
    selected ? `answers/${selected.id}` : null
  );

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

  return (
    <div className="answers_container">{answers && renderAnswers(answers)}</div>
  );
});
