import "./Typewaste.css"; 

function Typewastenav() {
  const wastedata = [
    { id: "1", name: "Plastic PET", img: "home-PET.png" },
    { id: "2", name: "Plastic HDPE", img: "home-HDPE.png" },
    { id: "3", name: "Can Aluminium", img: "home-Can.png" },
    { id: "4", name: "Bottle Glass", img: "home-Glass.png" },
    { id: "5", name: "Card Box", img: "home-box.png" },
  ];

  return (
    <div className="type-recycle">
      <h1>ประเภทของขยะรีไซเคิล</h1>
      <div className="type-grid">
        {wastedata.map((item) => (
          <div className="type-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Typewastenav;
