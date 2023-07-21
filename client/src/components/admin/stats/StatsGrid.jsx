import React from 'react';
import { createStyles, Group, Paper, Text } from '@mantine/core';
import { IconContext } from 'react-icons';
import { AiOutlineUserAdd, AiFillFileImage, AiFillLike } from 'react-icons/ai';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import {MdReport} from "react-icons/md"
import LoadingSpinner from '../../loading/LoadingSpinner';


const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const icons = {
  user: AiOutlineUserAdd,
  post: AiFillFileImage,
  report: MdReport,
  like: AiFillLike,
};

export default function StatsGrid({ data,isLoading }){
  const { classes } = useStyles();
  const stats = data?.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? RiArrowUpLine : RiArrowDownLine;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <IconContext.Provider value={{ className: classes.icon, size: '1.4rem' }}>
            <Icon />
          </IconContext.Provider>
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <IconContext.Provider value={{ size: '1rem', style: { verticalAlign: 'middle' } }}>
              <DiffIcon />
            </IconContext.Provider>
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <div className="SimpleGrid">
        {isLoading? <LoadingSpinner/> : stats}
      </div>
    </div>
  )
}

