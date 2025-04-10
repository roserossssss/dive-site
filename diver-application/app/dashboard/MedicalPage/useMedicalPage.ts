import { useState, ChangeEvent } from "react";

export function useMedicalPage() {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [suffix, setSuffix] = useState("");
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [age, setAge] = useState("35");
  const [sex, setSex] = useState("male");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasChronicCondition, setHasChronicCondition] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [bloodType, setBloodType] = useState("");
  const [allergiesDetails, setAllergiesDetails] = useState("");
  const [chronicConditionDetails, setChronicConditionDetails] = useState("");
  const [disabilityDetails, setDisabilityDetails] = useState("");
  const [emergencyContactPerson, setEmergencyContactPerson] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [medicalCertificate, setMedicalCertificate] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [dateIssued, setDateIssued] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validExtensions = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validExtensions.includes(file.type)) {
        alert("Invalid file type. Only PNG, JPG, JPEG, and PDF files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds the maximum limit of 5MB.");
        return;
      }

      setMedicalCertificate(file.name);
    }
  };

  const validateFields = () => {
    return (
      emergencyContactPerson.trim() !== "" &&
      emergencyContactNumber.trim() !== "" &&
      relationship.trim() !== "" &&
      medicalCertificate.trim() !== "" &&
      bloodType.trim() !== "" &&
      (hasAllergies ? allergiesDetails.trim() !== "" : true) &&
      (hasChronicCondition ? chronicConditionDetails.trim() !== "" : true) &&
      (hasDisability ? disabilityDetails.trim() !== "" : true) &&
      issuedBy.trim() !== "" &&
      dateIssued.trim() !== "" &&
      hasAllergies !== null &&
      hasChronicCondition !== null &&
      hasDisability !== null
    );
  };

  const handleSave = () => {
    if (validateFields()) {
      setIsModalOpen(true);
    } else {
      setIsValidationModalOpen(true);
    }
  };

  return {
    editMode,
    setEditMode,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    suffix,
    setSuffix,
    birthdate,
    setBirthdate,
    age,
    setAge,
    sex,
    setSex,
    hasAllergies,
    setHasAllergies,
    hasChronicCondition,
    setHasChronicCondition,
    hasDisability,
    setHasDisability,
    bloodType,
    setBloodType,
    allergiesDetails,
    setAllergiesDetails,
    chronicConditionDetails,
    setChronicConditionDetails,
    disabilityDetails,
    setDisabilityDetails,
    emergencyContactPerson,
    setEmergencyContactPerson,
    emergencyContactNumber,
    setEmergencyContactNumber,
    relationship,
    setRelationship,
    medicalCertificate,
    setMedicalCertificate,
    issuedBy,
    setIssuedBy,
    dateIssued,
    setDateIssued,
    isModalOpen,
    setIsModalOpen,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isValidationModalOpen,
    setIsValidationModalOpen,
    handleFileUpload,
    handleSave,
  };
}