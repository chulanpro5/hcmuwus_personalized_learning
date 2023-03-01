import Grid from "@mui/material/Grid";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import PerformanceChart from "./components/PerformChart/PerformChart";
import MyBookshelf from "./components/Bookshelf/bookshelf";
import Paper from '@mui/material/Paper';
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./Calendar.css";
function Overview() {
  return (
    <DashboardLayout>
      <VuiBox>
        <Grid container marginLeft={6} columns={24} sx={({ breakpoints }) => ({
          [breakpoints.only('sm')]: {
            direction: 'column',
          },
          [breakpoints.up('md')]: {
            direction: 'row',
          }
        })}>
          <WelcomeMark />
        </Grid>
        <Grid
          container
          columns={12}
          sx={({ breakpoints }) => ({
            [breakpoints.only('sm')]: {
              direction: 'column',
            },
            [breakpoints.up('md')]: {
              direction: 'row',
            }
          })}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={6}
          >
            <Grid item xs={12} md={6} xl={3}>
              <PerformanceChart />
            </Grid>
            <Grid item>
              <Paper sx={{ width: 500, height: 380, borderRadius: 10, padding: 4 }}>
                <div className="card flex justify-content-center">
                  <Calendar/>
                </div>
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <MyBookshelf />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Overview;
