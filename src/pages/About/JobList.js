import { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PortableText } from '@portabletext/react';
import { useTheme } from '@mui/material/styles';

const components = {
  block: {
    h1: ({ children }) => <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>{children}</Typography>,
    h2: ({ children }) => <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>{children}</Typography>,
    normal: ({ children }) => <Typography variant="body1" sx={{ mb: 1 }}>{children}</Typography>
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: 24 }}>{children}</ul>
  },
  listItem: {
    bullet: ({ children }) => <li><Typography variant="body2">{children}</Typography></li>
  },
  types: {
    image: ({ value }) => (
      <Box
        component="img"
        src={value.asset?.url}
        alt={value.alt || ''}
        sx={{ width: '100%', maxWidth: 600, my: 2 }}
      />
    )
  }
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    client
      .fetch(`*[_type == "job" && isPublished == true] | order(_createdAt desc)`)
      .then(setJobs)
      .catch(console.error);
  }, []);

  return (
    <Box id="section1" sx={{ position: 'relative', zIndex: 0, height: '90vh' }}>
    <Box sx={{ mt:10 , p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
        Offres d’emploi
      </Typography>

      {jobs.length === 0 && (
        <Typography sx={{ textAlign: 'left' }}>
          Aucune offre pour le moment.
        </Typography>
      )}

      {jobs.map((job) => (
        <Accordion
          key={job._id}
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': {
              backgroundColor: theme.palette.background.default
            }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {job.location}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: theme.palette.background.default
            }}
          >
            <PortableText value={job.descriptionRich} components={components} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
    </Box>
  );
};

export default JobList;
