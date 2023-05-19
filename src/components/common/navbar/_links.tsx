import React from 'react';
import {
  IconWallet,
  IconAlertCircle,
  IconShieldCheck,
  IconLockAccess,
  Icon2fa,
  IconApps
} from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'navigation/route-path';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
}

function MainLink({ icon, color, label, value }: MainLinkProps) {

  const navigate = useNavigate();
  
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={()=>{ navigate(value)}}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <IconWallet size="2em" />, color: 'blue', label: 'Account', value: RoutePath.account },
  { icon: <IconApps size="2rem" />, color: 'teal', label: 'DApp Transactions', value: RoutePath.dapps  },
  { icon: <IconShieldCheck size="2rem" />, color: 'violet', label: 'Recovery', value: RoutePath.recovery  },
  { icon: <Icon2fa size="2rem" />, color: 'grape', label: 'Transaction Guard', value: RoutePath.transactionGuard  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.value} />);
  return <div>{links}</div>;
}