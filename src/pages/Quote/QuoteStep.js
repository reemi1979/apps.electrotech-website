// src/pages/Quote/QuoteStep.js

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function QuoteStep({ step, data, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ ...data, [key]: value });
  };

  const handleRemove = (fieldKey, index) => {
    const list = [...(data[fieldKey] || [])];
    list.splice(index, 1);
    onUpdate({ ...data, [fieldKey]: list });
  };

  const handleAdd = (fieldKey) => {
    const list = [...(data[fieldKey] || [])];
    list.push({});
    onUpdate({ ...data, [fieldKey]: list });
  };

  const renderField = (field, index) => {
    if (field.type === 'addButton') {
      const items = data[field.key] || [];

      return (
        <Grid item size={{ xs: 12 }} key={index}>
          {items.length > 0 && (
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>{field.label}</Typography>
          )}
          {items.map((item, i) => {
            const topFields = field.fields.filter((f) => f.topRow);
            const mainFields = field.fields.filter((f) => !f.topRow);

            return (
              <Box key={i}>
                {topFields.length > 0 && (
                  <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    {topFields.map((topField, j) => {
                      const shouldRender = !topField.condition || topField.condition(item);
                      if (!shouldRender) return null;
                      return (
                        <Grid item size={{ xs: 12 }} key={j}>
                          <Typography sx={{ mb: 1 }}>{topField.label}</Typography>
                          <ToggleButtonGroup
                            value={item[topField.key] || ''}
                            exclusive
                            onChange={(e, value) => {
                              if (!value) return;
                              const updated = [...items];
                              updated[i] = { ...updated[i], [topField.key]: value };
                              handleChange(field.key, updated);
                            }}
                            size="small"
                          >
                            <ToggleButton value="yes">Yes</ToggleButton>
                            <ToggleButton value="no">No</ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}

                <Grid container spacing={2} alignItems="center" sx={{ mb: 0.5 }} wrap="nowrap">
                  {mainFields.map((subField, j) => {
                    const shouldRender = !subField.condition || subField.condition(item);
                    if (!shouldRender) return null;

                    const commonProps = {
                      fullWidth: true,
                      key: j
                    };

                    if (subField.type === 'textfield') {
                      return (
                        <Grid item sx={{ flex: 1 }} {...commonProps}>
                          <TextField
                            label={subField.label}
                            value={item[subField.key] || ''}
                            onChange={(e) => {
                              const updated = [...items];
                              updated[i] = { ...updated[i], [subField.key]: e.target.value };
                              handleChange(field.key, updated);
                            }}
                            fullWidth
                          />
                        </Grid>
                      );
                    }

                    if (subField.type === 'toggle') {
                      return (
                        <Grid item sx={{ flex: 1 }} {...commonProps}>
                          <Typography sx={{ mb: 1 }}>{subField.label}</Typography>
                          <ToggleButtonGroup
                            value={item[subField.key] || ''}
                            exclusive
                            onChange={(e, value) => {
                              if (!value) return;
                              const updated = [...items];
                              updated[i] = { ...updated[i], [subField.key]: value };
                              handleChange(field.key, updated);
                            }}
                            size="small"
                          >
                            <ToggleButton value="yes">Yes</ToggleButton>
                            <ToggleButton value="no">No</ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                      );
                    }

                    return (
                      <Grid item sx={{ flex: 1 }} {...commonProps}>
                        {subField.type === 'dropdown' && item[subField.key] === 'Other' ? (
                          <TextField
                            label={subField.label + ' (Other)'}
                            value={item[subField.key + '_custom'] || ''}
                            onChange={(e) => {
                              const updated = [...items];
                              updated[i] = { ...updated[i], [subField.key + '_custom']: e.target.value };
                              handleChange(field.key, updated);
                            }}
                            fullWidth
                          />
                        ) : (
                          <TextField
                            select
                            label={subField.label}
                            value={item[subField.key] || ''}
                            onChange={(e) => {
                              const updated = [...items];
                              updated[i] = { ...updated[i], [subField.key]: e.target.value };
                              handleChange(field.key, updated);
                            }}
                            fullWidth
                          >
                            {(subField.options || []).map((opt) => (
                              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                          </TextField>
                        )}
                      </Grid>
                    );
                  })}

                  <Grid item>
                    <IconButton onClick={() => handleRemove(field.key, i)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Grid>
      );
    }

    if (field.type === 'dropdown') {
      return (
        <Grid item size={{ xs: 12, md: 12 }} key={index}>
          {data[field.key] === 'Other' ? (
            <TextField
              label={field.label + ' (Other)'}
              value={data[field.key + '_custom'] || ''}
              onChange={(e) => handleChange(field.key + '_custom', e.target.value)}
              fullWidth
            />
          ) : (
            <TextField
              select
              label={field.label}
              value={data[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              fullWidth
            >
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
      );
    }

    if (field.type === 'textfield') {
      return (
        <Grid item size={{ xs: 12, md: 12 }} key={index}>
          <TextField
            label={field.label}
            value={data[field.key] || ''}
            placeholder={field.placeholder || ''}
            slotProps={{
              inputLabel: field.shrink ? { shrink: true } : undefined
            }}
            onChange={(e) => handleChange(field.key, e.target.value)}
            fullWidth
          />
        </Grid>
      );
    }

    if (field.type === 'toggle') {
      return (
        <Grid item size={{ xs: 12 }} key={index}>
          <Typography sx={{ mb: 1 }}>{field.label}</Typography>
          <ToggleButtonGroup
            value={data[field.key] || ''}
            exclusive
            onChange={(e, value) => value && handleChange(field.key, value)}
            size="small"
          >
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      );
    }

    return null;
  };

  return (
    <>
      <Grid container spacing={2}>
        {step.fields.map((field, index) => renderField(field, index))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {step.fields
          .filter((f) => f.type === 'addButton')
          .map((field, i) => (
            <Button
              key={i}
              variant="outlined"
              size="small"
              onClick={() => handleAdd(field.key)}
            >
              + Add {field.label.split(' - ')[1] || field.label}
            </Button>
          ))}
      </Box>
    </>
  );
}
