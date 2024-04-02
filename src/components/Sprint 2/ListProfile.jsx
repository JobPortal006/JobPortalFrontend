import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BASE_URL from '../CommonAPI';
import "./ListProfile.css";

export const ListProfile = () => {
    const location = useLocation();
    const jobmail = location.state.encryptUserId;
    console.log(jobmail,"jobmail");
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user_profile_list/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: jobmail }),
                });

                const data = await response.json();
                setProfileData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [jobmail]);

    const openResume = () => {
        window.open(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${profileData.resume.resume_path}`, '_blank');
    };

    return (
        <div className="profile-container">
            {profileData && (
                <div className="profile-wrapper">
                    <h3><b>User Profile</b></h3>
                    <div className="profile-details">
                        <div className="profile-picture">
                            {profileData.userDetails.profile_picture_path && (
                                <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${profileData.userDetails.profile_picture_path}`}
                                    alt="Profile" />
                            )}
                        </div>
                        <div className="personal-details">
                            <p><strong>Name:</strong> {profileData.userDetails.first_name}</p>
                            <p><strong>Email:</strong> {profileData.Signup.email}</p>
                        </div>
                        <div className="contact-details">
                            <p><strong>Phone:</strong> {profileData.Signup.mobile_number}</p>
                            <p><strong>College Name:</strong> {profileData.college_details.college_name}</p>
                        </div> 
                    </div>
                    <div className="professional-details">
                        <h3><b>About</b></h3>
                        {profileData.resume && profileData.resume.employment_status === "Experienced" && (
                            <div>
                                <h4><b>Professional Details</b></h4>
                                <p><strong>Number of Companies:</strong> {profileData.professionalDetails.numberOfCompanies}</p><br/>
                                {profileData.professionalDetails.companies && profileData.professionalDetails.companies.map((company, index) => (
                                    <div key={index}>
                                        <h4><b>Company {index + 1}</b></h4><br/>
                                        <p><strong>Company Name:</strong> {company.company_name}</p>
                                        <p><strong>Years of Experience:</strong> {company.years_of_experience}</p>
                                        <p><strong>Job Role:</strong> {company.job_role}</p>
                                        <p><strong>Skills:</strong> {company.skills}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {profileData.resume && profileData.resume.employment_status === "Fresher" && (
                            <div>
                                <h3>Fresher</h3>
                            </div>
                        )}
                    </div>
                    <div className="address-details">
                        <h3><b>Address</b></h3>
                        <div className="address-row">
                            <div className="address-column">
                                <h4><b>Current Address</b></h4>
                                <p><strong>City:</strong> {profileData.address.current.city}</p>
                                <p><strong>Country:</strong> {profileData.address.current.country}</p>
                                <p><strong>Pincode:</strong> {profileData.address.current.pincode}</p>
                            </div>
                            <div className="address-column">
                                <h4><b>Permanent Address</b></h4>
                                <p><strong>City:</strong> {profileData.address.permanent.city}</p>
                                <p><strong>Country:</strong> {profileData.address.permanent.country}</p>
                                <p><strong>Pincode:</strong> {profileData.address.permanent.pincode}</p>
                            </div>
                        </div>
                    </div>
                    {profileData.resume && profileData.resume.resume_path && (
                        <div className="resume-details">
                            <h3><b>Resume</b></h3>
                            <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${profileData.resume.resume_path}`)}&embedded=true&rm=minimal`}
                                width="50%" height="400px" style={{ border: 'none' }}
                                title="Resume"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};




// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Grid, Paper, Typography } from '@mui/material';
// import BASE_URL from '../CommonAPI';

// export const ListProfile = () => {
//     const location = useLocation();
//     const jobmail = location.state.userId;
//     const [profileData, setProfileData] = useState(null);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/user_profile_list/`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ email: jobmail }),
//                 });

//                 const data = await response.json();
//                 setProfileData(data.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         getData();
//     }, [jobmail]);

//     return (
//         <div style={{ padding: '40px', marginTop: '50px' }}>
//             {profileData && (
//                 <Paper style={{ maxWidth: '800px', margin: 'auto', padding: '40px', borderRadius: '10px', backgroundColor: '#C5CAE9', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
//                     <Typography variant="h4" align="center" gutterBottom><b>User Profile</b></Typography>
//                     <Grid container spacing={3} justifyContent="center" marginTop='10px' borderRadius="10px" padding='5px' backgroundColor="#7986CB">
//                         <Grid item xs={12} sm={6} md={4}>
//                             {profileData.userDetails.profile_picture_path && (
//                                 <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${profileData.userDetails.profile_picture_path}`} alt="Profile" style={{ width: '200px', height: '190px', marginLeft:'30px', borderRadius: '50%', marginBottom: '20px' }} />
//                             )}
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={8}>
//                             <Grid container spacing={2} marginTop="15px">
//                                 <Grid item xs={12}>
//                                     <Typography><strong>Name:</strong> {profileData.userDetails.first_name}</Typography>
//                                     <Typography><strong>Email:</strong> {profileData.Signup.email}</Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography><strong>Phone:</strong> {profileData.Signup.mobile_number}</Typography>
//                                     <Typography><strong>College Name:</strong> {profileData.college_details.college_name}</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <div style={{ marginBottom: '20px' }}>
//                         {profileData.resume && profileData.resume.employment_status === "Experienced" && (
//                             <div>
//                                 <Typography variant="h5" style={{ marginTop: '20px' }}><b>Professional Details</b></Typography>
//                                 <Typography>Number of Companies: {profileData.professionalDetails.numberOfCompanies}</Typography>
//                                 {profileData.professionalDetails.companies && profileData.professionalDetails.companies.map((company, index) => (
//                                     <div key={index}>
//                                         <Typography variant="h6">Company {index + 1}</Typography>
//                                         <Typography>Company Name: {company.company_name}</Typography>
//                                         <Typography>Years of Experience: {company.years_of_experience}</Typography>
//                                         <Typography>Job Role: {company.job_role}</Typography>
//                                         <Typography>Skills: {company.skills}</Typography>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         {profileData.resume && profileData.resume.employment_status === "Fresher" && (
//                             <Typography variant="h5">Fresher</Typography>
//                         )}
//                     </div>
//                     <div style={{ marginBottom: '20px' }}>
//                         <Typography variant="h5"><b>Address</b></Typography>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <Typography><strong>Current Address</strong></Typography>
//                                 <Typography>City: {profileData.address.current.city}</Typography>
//                                 <Typography>Country: {profileData.address.current.country}</Typography>
//                                 <Typography>Pincode: {profileData.address.current.pincode}</Typography>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <Typography><strong>Permanent Address</strong></Typography>
//                                 <Typography>City: {profileData.address.permanent.city}</Typography>
//                                 <Typography>Country: {profileData.address.permanent.country}</Typography>
//                                 <Typography>Pincode: {profileData.address.permanent.pincode}</Typography>
//                             </Grid>
//                         </Grid>
//                     </div>
//                     {profileData.resume && profileData.resume.resume_path && (
//                         <div>
//                             <Typography variant="h5"><b>Resume</b></Typography>
//                             <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${profileData.resume.resume_path}`)}&embedded=true&rm=minimal`} width="100%" height="400px" style={{ border: 'none' }} title="Resume" />
//                         </div>
//                     )}
//                 </Paper>
//             )}
//         </div>
//     );
// };


