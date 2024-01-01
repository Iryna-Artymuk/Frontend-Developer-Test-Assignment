import SuccessImageIcon from '../Icons/Logo/SuccessImageIcon';
import Container from '../container/Container';

const SuccessImage = () => {
  return (
    <Container>
      <div className="contentWrapper">
        <h2 className="title"> User successfully registered</h2>
        <SuccessImageIcon />
      </div>
    </Container>
  );
};

export default SuccessImage;
