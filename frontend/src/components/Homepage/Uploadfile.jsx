const Uploadfile = ({onFileSelect}) => {

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    //   setIsLoading(true);
      console.log("ไฟล์ที่เลือก:", file);
      onFileSelect(file);
    } else {
      console.log("ไม่มีไฟล์");
    }
  };

  return (
    <div>
      <input
        type="file"
        id="File" 
        name="image"
        onChange={handleOnChange}
        className="sr-only"
        accept="image/*"
      />
    </div>
  );
};

export default Uploadfile;
