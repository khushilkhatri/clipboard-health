import Next from "next";
import { Accordion, useAccordionToggle } from "react-bootstrap";

const Collapse = ({ collapseToggle, collapseBody }) => {
  return (
    <Accordion className="w-100">
      <CustomToggle eventKey="1">{collapseToggle}</CustomToggle>
      <Accordion.Collapse eventKey="1">{collapseBody}</Accordion.Collapse>
    </Accordion>
  );
};

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey);
  return <div onClick={decoratedOnClick}>{children}</div>;
}

export default Collapse;
