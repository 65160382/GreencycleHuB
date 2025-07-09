import "./Amountnav.css";
const Amountnav = () => {
  const quantitydata = [
    { id: "1", name: "Plastic PET",quantity: "0", img: "home-type-pet.png" },
    { id: "2", name: "Plastic HDPE",quantity: "0", img: "home-type-hdpe.png" },
    { id: "3", name: "Can Aluminium",quantity: "0", img: "home-type-can.png" },
    { id: "4", name: "Bottle Glass",quantity: "0", img: "home-type-glass.png" },
    { id: "5", name: "Card Box",quantity: "0", img: "home-type-box.png" },
  ];
  return (
    <div className="amount-waste">
      <h1>จำนวนขยะสะสมของคุณ</h1>
      <div className="amount-grid">
        {quantitydata.map((item)=>(
          <div className="amount-type" key={item.id}>
          <img src={item.img} alt={item.name}></img>
          <p>{item.name}</p>
          <p>{item.quantity} kilogram</p>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default Amountnav;
