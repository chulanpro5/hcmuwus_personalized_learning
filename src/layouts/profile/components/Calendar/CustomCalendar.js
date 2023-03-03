import { React, useState, useEffect } from 'react';
import dayjs from "dayjs"
import range from "lodash-es/range"
import { Grid, Paper } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiButton from 'components/VuiButton';
import VuiTypography from 'components/VuiTypography';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
const todayObj = dayjs();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const CustomCalendar = (props) => {
    const [dayObj, setDayObj] = useState(dayjs());
    const [events, setEvents] = useState([dayjs('2023-02-27'), dayjs('2023-03-06'), dayjs('2023-03-19'), dayjs('2023-03-25')]);

    const thisYear = dayObj.year();
    const thisMonth = dayObj.month(); // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth();

    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)

    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
    const weekDayOfLast = dayObjOfLast.day();

    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, "month"))
    }

    const handleNext = () => {
        setDayObj(dayObj.add(1, "month"))
    }


    return (
        <Paper sx={{ width: 500, height: 380, borderRadius: 10, padding: 2 }}>
            <Grid sx={{ height: 380 }}>
                <VuiBox display="inline" sx={{ width: "100%", margin: 1 }}>
                    <VuiButton onClick={handlePrev} sx={{
                        width: "10%", '&:hover': {
                            backgroundColor: 'lightgreen'
                        }, marginRight: 3
                    }}><AiFillBackward color='black' width={20} /></VuiButton>
                    <VuiTypography variant="lg" sx={{ marginLeft: 8, marginRight: 8, fontWeight: 'bold' }}>{dayObj.format("MMM - DD - YYYY")}</VuiTypography>
                    <VuiButton onClick={handleNext} sx={{
                        width: "10%", '&:hover': {
                            backgroundColor: 'lightgreen'
                        }, marginLeft: 3
                    }}><AiFillForward color='black' width={20} /></VuiButton>
                </VuiBox>
                <VuiBox display="inline" sx={{ display: 'flex', direction: 'column', width: "100%", margin: 2, marginBottom: 1 }}>
                    {weekDays.map(day => <VuiTypography variant="lg" sx={{
                        marginTop: 1, marginRight: 3, marginLeft: 0.2, padding: 0.4, '&:hover': {
                            color: 'red'
                        }
                    }}>{day}</VuiTypography>)}
                </VuiBox>
                <Grid columns={7} sx={{ rowGap: 1, width: 500, height: 180, padding: 1 }}>
                    {range(weekDayOf1).map(i => (
                        <VuiButton key={i} contained color={(events.filter(event => event.isSame(dayObjOf1.subtract(weekDayOf1 - i, "day"))).length !== 0) ? 'error' : 'light'} sx={{
                            margin: 0, color: 'black', width: 10, padding: 1, height: 7, '&:hover': {
                                backgroundColor: 'lightgreen'
                            }
                        }}>
                            <VuiTypography variant='lg'>{dayObjOf1.subtract(weekDayOf1 - i, "day").date()}</VuiTypography>
                        </VuiButton>
                    ))}
                    {range(daysInMonth).map(i => (
                        <VuiButton key={i} contained color={dayObj.date() === (i + 1) ? 'warning' : (events.filter(event => event.isSame(dayObjOf1.subtract(weekDayOf1 - i, "day"))).length !== 0) ? 'error' : 'light'} sx={{
                            margin: 0, color: 'black', width: 10, padding: 1, height: 7, '&:hover': {
                                backgroundColor: 'lightgreen'
                            }
                        }}>
                            <VuiTypography variant='lg'>{i + 1}</VuiTypography>
                        </VuiButton>
                    ))}
                    {range(6 - weekDayOfLast).map(i => (
                        <VuiButton key={i} contained color={(events.filter(event => event.isSame(dayObjOf1.subtract(weekDayOf1 - i, "day"))).length !== 0) ? 'error' : 'light'} sx={{
                            margin: 0, color: 'black', width: 10, padding: 1, height: 7, '&:hover': {
                                backgroundColor: 'lightgreen'
                            }
                        }}>
                            <VuiTypography variant='lg'>{dayObjOfLast.add(i + 1, "day").date()}</VuiTypography>
                        </VuiButton>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
}