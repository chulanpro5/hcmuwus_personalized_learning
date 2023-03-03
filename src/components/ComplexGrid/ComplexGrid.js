import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" fontWeight="bold" fontSize={15}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
export default function ComplexGrid(props) {
  return (
    <Paper
      sx={{
        margin: 2,
        marginLeft: 0,
        width: 430,
        flexGrow: 1,
        borderRadius: 7,
        padding: 1,
        backgroundColor: (props.progress === 100)? 'lightgreen': (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        '&:hover': {
          backgroundColor:  'light',
          opacity:[0.7,0.5,0.7]
        }
      }}
    >
      <Button>
        <Grid container spacing={2} justifyContent='center' alignItems={'center'}>
          <Grid item>
            <CircularProgressWithLabel value={props.progress} color={(props.progress === 100)? 'success': (props.progress >= 50) ? 'warning': 'error'} size={75} />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div" align="left" color={(props.progress === 100)? 'black': (props.progress >= 50) ? "warning": 'error'}>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Paper>
  );
}
