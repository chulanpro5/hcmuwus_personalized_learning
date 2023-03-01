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
        <Typography variant="caption" component="div" color="text.secondary">
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
        p: 2,
        margin: 2,
        maxWidth: 500,
        flexGrow: 1,
        borderRadius: 5,
        padding: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
    <Button>
      <Grid container spacing={2} justifyContent='center' alignItems={'center'}>
        <Grid item>
          <CircularProgressWithLabel value={props.progress} color="success" size={70}/>
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1" component="div">
            <p style={{fontSize:20, fontFamily: "Arial", color: "green", fontWeight: 15}}>{props.title}</p>
          </Typography>
        </Grid>
      </Grid>
    </Button>
    </Paper>
  );
}
