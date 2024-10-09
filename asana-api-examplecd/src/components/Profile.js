import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, Container, Box, Card, CardContent, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/system';

// กำหนด access token ของ Asana (อย่าลืมเปลี่ยนเป็น access token ของคุณ)
const accessToken = '2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09';

const ProfileCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: '5rem auto auto auto', // เพิ่มระยะห่างจากด้านบนเป็น 5rem
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
  }));
  

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
}));

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://app.asana.com/api/1.0/users/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setProfileData(response.data.data);
      } catch (error) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      {profileData ? (
        <ProfileCard>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* รูปภาพโปรไฟล์ */}
            <AvatarStyle src={profileData.photo ? profileData.photo.image_128x128 : ''} alt={profileData.name}>
              {profileData.name[0]} {/* หากไม่มีรูป ใช้ตัวอักษรแรกของชื่อ */}
            </AvatarStyle>

            {/* ข้อมูลโปรไฟล์ */}
            <CardContent>
              <Typography variant="h5" gutterBottom>{profileData.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{profileData.email}</Typography>
            </CardContent>

            {/* รายละเอียดเพิ่มเติม สามารถใส่ได้ */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Department: {profileData.workspaces && profileData.workspaces[0].name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Role: {profileData.role || 'Member'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ProfileCard>
      ) : (
        <Typography>No profile data available</Typography>
      )}
    </Container>
  );
};

export default Profile;
