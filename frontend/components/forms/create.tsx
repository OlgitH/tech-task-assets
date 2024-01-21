import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { FormEvent } from 'react'

type Props = {};

export default function CreateForm({}: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    skills: [],
  });
  const skillOptions = ["html", "javascript", "css"];

  const [errorMessages, setErrorMessages] = useState("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessages("");

    const { firstName, lastName, role, email, skills } = formData;

    if (!firstName || !lastName || !role || !email) {
      setErrorMessages("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessages("Invalid email address.");
      return;
    }

    if (skills.length === 0) {
      setErrorMessages("At least one skill must be selected.");
      return;
    }

    // If all validations pass, you can submit the form or perform other actions.
    console.log('Form submitted');
    
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckboxChange = (skill) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.indexOf(skill);

    if (skillIndex === -1) {
      updatedSkills.push(skill);
    } else {
      updatedSkills.splice(skillIndex, 1);
    }

    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

 
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        required
      />

      <label htmlFor="role">Role:</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
      >
        <option value="">Select Role</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>

      <label>Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <label>Skills:</label>
      <div>
        {skillOptions.map((skill, i) => (
          <label key={`cb-${i}`}>
            <input
              type="checkbox"
              name={skill}
              checked={formData.skills.includes(skill)}
              onChange={() => handleCheckboxChange(skill)}
            />
            {skill.toLocaleLowerCase()}
          </label>
        ))}
      </div>

      <button type="submit">
        Submit
      </button>

      {errorMessages && <div style={{ color: "#f00" }}>{errorMessages}</div>}
    </form>
  );
}
