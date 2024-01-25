import { useState, FormEvent, ChangeEvent } from "react";
import styles from "@/styles/Form.module.css";
import Skill from "@/interfaces/skill";
import { addResource } from "@/lib/helpers";

type Props = { allSkills: Skill[] | undefined };

interface FormData {
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  skills: Skill[];
}

export default function CreateForm({ allSkills }: Props) {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    skills: [],
  });

  const [errorMessages, setErrorMessages] = useState<string>("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessages("");

    const { firstname, lastname, role, email, skills } = formData;

    if (!firstname || !lastname || !role || !email) {
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
    console.log(formData);
    addResource(formData);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckboxChange = (skill: Skill) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.id === skill.id);

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={formData.firstname}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
        required
      />

      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
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
        {allSkills
          ? allSkills.map((skill, i) => (
              <label key={`cb-${i}`}>
                <input
                  type="checkbox"
                  name={skill.name}
                  checked={formData.skills.some((s) => s.id === skill.id)}
                  onChange={() => handleCheckboxChange(skill)}
                />
                {skill.name}
              </label>
            ))
          : "Could not retrieve skills"}
      </div>

      <button type="submit">Submit</button>

      {errorMessages && <div style={{ color: "#f00" }}>{errorMessages}</div>}
    </form>
  );
}
