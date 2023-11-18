import React, { useEffect } from "react";
import { useState } from "react";
import {
  createStyles,
  Text,
  Paper,
  Group,
  rem,
} from "@mantine/core";

import { FaUsers } from "react-icons/fa";
import { BsFillBagHeartFill, BsFillPostcardHeartFill } from "react-icons/bs";
import { Chart } from "../chart/Chart";
import StatsGrid from "../stats/StatsGrid";

import {
  FetchNewLikesStats,
  FetchNewPostsStats,
  FetchNewReportsStats,
  FetchNewUsersStats,
  FetchTotal,
} from "../../../api/UserListRequest";
import useThrowAsyncError from "../../../hooks/useThrowAsyncError";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: "flex",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.lg,
    color: theme.colors[theme.primaryColor][6],
  },

  stat: {
    minWidth: rem(98),
    paddingTop: theme.spacing.xl,
    minHeight: rem(140),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.white,
  },

  label: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[6],
    lineHeight: 1.2,
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  day: {
    fontSize: rem(44),
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  month: {
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    marginRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  control: {
    height: rem(28),
    width: "100%",
    color: theme.colors[theme.primaryColor][2],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
    transition: "background-color 50ms ease",

    [theme.fn.smallerThan("xs")]: {
      height: rem(34),
      width: rem(34),
    },

    "&:hover": {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan("xs")]: {
      transform: "rotate(-90deg)",
    },
  },
}));

const iconsData = [
  { icon: FaUsers, label: "Users" },
  { icon: BsFillPostcardHeartFill, label: "Posts" },
  { icon: BsFillBagHeartFill, label: "Likes" },
];

function DashboardContent() {
  const { classes } = useStyles();
  const [totalData, setTotalData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const throwAsyncErr = useThrowAsyncError();


  const fetchNewUsersStats = async () => {
    try {
      const { data } = await FetchNewUsersStats();
      const newData = data;
      setData((prevData) => {
        const hasData = prevData.some((item) => item.title === newData.title);
        return hasData ? prevData : [...prevData, newData];
      });
    } catch (err) {
      console.error(err);
      throwAsyncErr(err)
    }
  };

  const fetchNewPostsStats = async () => {
    try {
      const { data } = await FetchNewPostsStats();
      const newData = data; // Replace with the actual data received

      setData((prevData) => {
        const hasData = prevData.some((item) => item.title === newData.title);
        return hasData ? prevData : [...prevData, newData];
      });
    } catch (err) {

      console.error(err);
      throwAsyncErr(err)

    }
  };

  const fetchLikesStats = async () => {
    try {
      const { data } = await FetchNewLikesStats();
      const newData = data; // Replace with the actual data received

      setData((prevData) => {
        const hasData = prevData.some((item) => item.title === newData.title);
        return hasData ? prevData : [...prevData, newData];
      });
    } catch (err) {
      console.error(err);
      throwAsyncErr(err)

    }
  };

  const fetchReportsStats = async () => {
    try {
      const { data } = await FetchNewReportsStats();
      const newData = data; // Replace with the actual data received

      setData((prevData) => {
        const hasData = prevData.some((item) => item.title === newData.title);
        return hasData ? prevData : [...prevData, newData];
      });
    } catch (err) {
      console.error(err);
      throwAsyncErr(err)

    }
  };

  const fetchDataCount = async () => {
    try {
      const { data } = await FetchTotal();
      console.log("all data count", data);
      setTotalData(data);
    } catch (err) {
      console.error(err);
      throwAsyncErr(err)

    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        await fetchNewUsersStats();
        await fetchNewPostsStats();
        await fetchLikesStats();
        await fetchReportsStats();
        await fetchDataCount();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = iconsData.map((stat) => (
    <Paper
      className={classes.stat}
      radius="md"
      shadow="md"
      p="xs"
      key={stat.label}
    >
      <stat.icon size={32} className={classes.icon} stroke={1.5} />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>
            {stat.label === "Users"
              ? totalData?.totalUsers
              : stat.label === "Posts"
              ? totalData?.totalPosts
              : stat.label === "Likes"
              ? totalData?.totalLikes
              : null}
          </span>{" "}
        </Text>
      </div>
    </Paper>
  ));

  return (
    <>
      <div className="flex w-full flex-col px-5 py-3">
        <div className="my-3 w-full">
          <div className={classes.root}>
            <Group sx={{ flex: 1 }}>{stats}</Group>
          </div>
        </div>

        <div className="w-full lg:flex">
          <div className="flex lg:w-2/3">
            <Chart />
          </div>
          <div className="flex-1">
            <StatsGrid data={data} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
