const DisplayErrors = ({ errors }) => {
  return (
    <div>
      {errors?.map((err) => (
        <div className="text-sm text-red-600" key={err.code}>
          {err.longMessage}
        </div>
      ))}
    </div>
  );
};

export default DisplayErrors;
