import './FormButton.scss';

export const FormButton = ({ text }: { text: string }) => {
  return <button className="form-button">{text}</button>;
};
