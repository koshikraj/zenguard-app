import React from 'react';
import { IconChevronRight, IconChevronLeft, IconLogout } from '@tabler/icons';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme } from '@mantine/core';
import useRecoveryStore from 'store/recovery/recovery.store';
import { RoutePath } from 'navigation/route-path';
import { useNavigate } from 'react-router-dom';

export function User() {

  let navigate = useNavigate();
  const theme = useMantineTheme();
  const { authDetails, accountDetails, setAccountDetails, setAuthDetails, setSafeId } = useRecoveryStore(
    (state: any) => state
  );
  

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: ` solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      
        
        <Group>
          <Avatar
            src={authDetails.profileImage}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
            {authDetails.name}
            </Text>
            <Text color="dimmed" size="xs">
            {authDetails.email}
            </Text>
          </Box>
          <UnstyledButton
          onClick={async ()=> { await accountDetails.safeAuth.signOut(); setSafeId(''); setAuthDetails({}); setAccountDetails({});  navigate(RoutePath.login); }}
          sx={{
            // display: 'block',
            // width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          }}
        >
          {theme.dir === 'ltr' ? (
             <Box sx={{ flex: 1 }}>
               <Text size="xs" weight={500}>
            Logout
            </Text>
            <IconLogout  />
            </Box>
          ) : (
            <IconLogout  />
          )}
          </UnstyledButton>

          
        </Group>
      
    </Box>
  );
}