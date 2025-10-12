import { useEffect, useState } from "react";
import Modal from "../Core-UI/Modal";

const AddAddressModal = ({
  isOpen,
  onClose,
  onAddSuccess,
  mode = "add", // "add" | "edit"
  editId = null, // สำหรับโหมดแก้ไข
}) => {
  const [formData, setFormData] = useState({
    add_province: "",
    add_district: "",
    add_subdistrict: "",
    add_postcode: "",
    add_road: "",
    add_houseno: "",
    add_moo: "",
    add_default: false,
    add_lat: "",
    add_lon: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 1. รีเซ็ตค่าเมื่อโหมดเป็น add
  useEffect(() => {
    if (isOpen && mode === "add") {
      setFormData({
        add_province: "",
        add_district: "",
        add_subdistrict: "",
        add_postcode: "",
        add_road: "",
        add_houseno: "",
        add_moo: "",
        add_default: false,
        add_lat: "",
        add_lon: "",
      });
    }
  }, [isOpen, mode]);

  // ดึงพิกัดปัจจุบันเมื่อ modal เปิด (เฉพาะตอนเพิ่ม)
  useEffect(() => {
    if (isOpen && mode === "add" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setFormData((prev) => ({
            ...prev,
            add_lat: latitude,
            add_lon: longitude,
          }));
        },
        (err) => console.error("ไม่สามารถดึงพิกัดได้:", err)
      );
    }
  }, [isOpen, mode]);

  // โหลดข้อมูลเดิมถ้าเป็นโหมดแก้ไข
  useEffect(() => {
    if (isOpen && mode === "edit" && editId) {
      fetchAddressData(editId);
    }
  }, [isOpen, mode, editId]);

  const fetchAddressData = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/addresses/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const addr = data.result[0];
        setFormData({
          add_province: addr.add_province || "",
          add_district: addr.add_district || "",
          add_subdistrict: addr.add_subdistrict || "",
          add_postcode: addr.add_postcode || "",
          add_road: addr.add_road || "",
          add_houseno: addr.add_houseno || "",
          add_moo: addr.add_moo || "",
          add_default: addr.add_default === 1,
          add_lat: addr.add_lat || "",
          add_lon: addr.add_lon || "",
        });
      }
    } catch (err) {
      console.error("โหลดข้อมูลที่อยู่ไม่สำเร็จ:", err);
    }
  };

  // อัปเดตค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ฟังก์ชัน submit (เพิ่มหรือแก้ไข)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // ป้องกัน double click

    if (!formData.add_lat || !formData.add_lon) {
      alert("กรุณารอระบบดึงตำแหน่งปัจจุบันก่อนบันทึก");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const endpoint =
        mode === "edit"
          ? `${apiUrl}/api/addresses/${editId}`
          : `${apiUrl}/api/addresses`;
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(
          mode === "edit" ? "อัปเดตที่อยู่สำเร็จ" : "เพิ่มที่อยู่สำเร็จ",
          result
        );
        onAddSuccess(); // refresh ข้อมูล parent
        onClose();
      } else {
        console.error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
      widthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถวแรก */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "จังหวัด", name: "add_province" },
            { label: "อำเภอ", name: "add_district" },
            { label: "ตำบล", name: "add_subdistrict" },
            { label: "รหัสไปรษณีย์", name: "add_postcode" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-700">{field.label}</label>
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>
          ))}
        </div>

        {/* แถวสอง */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
          {[
            { label: "ถนน", name: "add_road" },
            { label: "บ้านเลขที่", name: "add_houseno" },
            { label: "หมู่", name: "add_moo" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-700">{field.label}</label>
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.name === "add_houseno"}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>
          ))}
        </div>

        {/* แผนที่แสดงตำแหน่ง */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            ตำแหน่งปัจจุบัน
          </label>
          <iframe
            title="map"
            width="100%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${formData.add_lat},${formData.add_lon}&z=15&output=embed`}
          ></iframe>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="add_default"
            checked={formData.add_default}
            onChange={handleChange}
            className="w-4 h-4 accent-green-600"
          />
          <label className="text-sm text-gray-700">
            ตั้งค่าเป็นที่อยู่เริ่มต้น
          </label>
        </div>

        {/* ปุ่มยืนยัน/ยกเลิก */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading
              ? "กำลังบันทึก..."
              : mode === "edit"
              ? "บันทึกการแก้ไข"
              : "ยืนยัน"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAddressModal;
