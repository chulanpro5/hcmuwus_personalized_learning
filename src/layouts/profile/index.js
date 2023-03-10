import Grid from "@mui/material/Grid";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import PerformanceChart from "./components/PerformChart/PerformChart";
import MyBookshelf from "./components/Bookshelf/bookshelf";
import Paper from '@mui/material/Paper';

import { CustomCalendar } from "./components/Calendar/CustomCalendar";

import ChartStore from "stores/ChartStore";
import { observer } from "mobx-react-lite";
import store from 'stores/userInfo';

function Overview() {
  const store = new ChartStore();
  const newData = [23, 23, 23, 21, 12, 12, 14];
  const newDay = [
    ['MON', ''],
    ['TUE', ''],
    ['WED', ''],
    ['THU', ''],
    ['FRI', ''],
    ['SAT', ''],
    ['SUN', ''],
  ];


  newData.map(data => store.addNewData(data));
  newDay.map(day => store.addNewDay(day));

  return (
    <DashboardLayout>
      <VuiBox>
        <Grid container columns={24} sx={({ breakpoints }) => ({
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
              <PerformanceChart store={store} />
            </Grid>
            <Grid item>
              {/* <Paper sx={{ width: 500, height: 380, borderRadius: 10, padding: 4 }}>
                <div className="card flex justify-content-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Calendar />
                  </MuiPickersUtilsProvider>
                </div>
              </Paper> */}
              <CustomCalendar/>
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

export default observer(Overview);
