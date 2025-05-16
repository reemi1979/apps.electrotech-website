import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function QuoteSummary({ data }) {
  useEffect(() => {
    console.log('🔧 Final Quote Data:', data);
  }, [data]);

  const formatLabel = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const safeRenderValue = (v) => {
    if (v === null || v === undefined) return '—';
    if (typeof v === 'object') return ''; // handled manually
    return String(v);
  };

  const renderObjectArray = (arr) => (
    <>
      {arr.map((item, j) => (
        <Box key={j} sx={{ mb: 1 }}>
          {item && typeof item === 'object' ? (
            <>
              {arr.length > 1 && (
                <Typography variant="body2" sx={{ mb: 0.5 }}>#{j + 1}</Typography>
              )}
              <Typography variant="body2">
                {Object.entries(item).map(([k, v], index) => `${formatLabel(k)}: ${v}`).join(', ')}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">- {safeRenderValue(item)}</Typography>
          )}
        </Box>
      ))}
    </>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Summary</Typography>
      {Object.entries(data).map(([sectionKey, sectionData], i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{formatLabel(sectionKey)}</Typography>
          <Box sx={{ pl: 2 }}>
            {Array.isArray(sectionData) ? (
              renderObjectArray(sectionData)
            ) : typeof sectionData === 'object' ? (
              Object.entries(sectionData).map(([key, value], j) => (
                <Box key={j} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{formatLabel(key)}</Typography>
                  <Box sx={{ pl: 1 }}>
                    {Array.isArray(value) ? (
                      renderObjectArray(value)
                    ) : typeof value === 'object' ? (
                      Object.entries(value).map(([k, v], kIndex) => (
                        <Typography variant="body2" key={kIndex}>
                          {formatLabel(k)}: {safeRenderValue(v)}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">{safeRenderValue(value)}</Typography>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2">{safeRenderValue(sectionData)}</Typography>
            )}
          </Box>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
