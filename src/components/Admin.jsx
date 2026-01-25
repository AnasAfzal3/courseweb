import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// Function jo aap button par lagayenge
const grantAccess = async (studentEmail, courseName) => {
  const userRef = doc(db, "users", studentEmail); // Email as ID
  try {
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseName)
    });
    alert("Access Granted!");
  } catch (e) {
    alert("User not found in database!");
  }
};