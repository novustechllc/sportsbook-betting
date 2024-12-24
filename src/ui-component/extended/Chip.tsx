import { useTheme, ChipProps, Chip as MuiChip } from '@mui/material';

interface chipProps extends ChipProps {
    chipcolor?: string;
    sx?: {};
    disabled?: boolean;
    label?: string | React.ReactElement;
    avatar?: React.ReactElement | undefined;
    onDelete?: () => void;
    onClick?: () => void;
}

const Chip = ({ chipcolor, disabled, sx = {}, variant, ...others }: chipProps) => {
    const theme = useTheme();

    let defaultSX = {
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
        ':hover': {
            color: theme.palette.primary.light,
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.dark + 90 : theme.palette.primary.dark
        }
    };

    let outlineSX = {
        color: theme.palette.primary.main,
        bgcolor: 'transparent',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        ':hover': {
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.light,
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark
        }
    };

    switch (chipcolor) {
        case 'secondary':
            variant === 'outlined'
                ? (outlineSX = {
                      color: theme.palette.secondary.main,
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: theme.palette.secondary.main,
                      ':hover': {
                          color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.main,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light
                      }
                  })
                : (defaultSX = {
                      color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.main,
                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
                      ':hover': {
                          color: theme.palette.secondary.light,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark + 90 : theme.palette.secondary.main
                      }
                  });
            break;
        case 'success':
            variant === 'outlined'
                ? (outlineSX = {
                      color: theme.palette.success.dark,
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: theme.palette.success.dark,
                      ':hover': {
                          color: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light + 60
                      }
                  })
                : (defaultSX = {
                      color: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark,
                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light + 60,
                      ':hover': {
                          color: theme.palette.success.light,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark + 90 : theme.palette.success.dark
                      }
                  });
            break;
        case 'error':
            variant === 'outlined'
                ? (outlineSX = {
                      color: theme.palette.error.main,
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: theme.palette.error.main,
                      ':hover': {
                          color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.dark,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light
                      }
                  })
                : (defaultSX = {
                      color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.dark,
                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light + 60,
                      ':hover': {
                          color: theme.palette.error.light,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.error.dark + 90 : theme.palette.error.dark
                      }
                  });
            break;
        case 'orange':
            variant === 'outlined'
                ? (outlineSX = {
                      color: theme.palette.orange?.dark!,
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: theme.palette.orange?.main!,
                      ':hover': {
                          color: theme.palette.orange?.dark!,
                          bgcolor: theme.palette.orange?.light!
                      }
                  })
                : (defaultSX = {
                      color: theme.palette.orange?.dark!,
                      bgcolor: theme.palette.orange?.light!,
                      ':hover': {
                          color: theme.palette.orange?.light!,
                          bgcolor: theme.palette.orange?.dark!
                      }
                  });
            break;
        case 'warning':
            variant === 'outlined'
                ? (outlineSX = {
                      color: theme.palette.warning.dark,
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: theme.palette.warning.dark,
                      ':hover': {
                          color: theme.palette.warning.dark,
                          bgcolor: theme.palette.warning.light
                      }
                  })
                : (defaultSX = {
                      color: theme.palette.warning.dark,
                      bgcolor: theme.palette.warning.light,
                      ':hover': {
                          color: theme.palette.warning.light,
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.warning.dark + 90 : theme.palette.warning.dark
                      }
                  });
            break;
        default:
    }

    if (disabled) {
        variant === 'outlined'
            ? (outlineSX = {
                  color: theme.palette.grey[500],
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderColor: theme.palette.grey[500],
                  ':hover': {
                      color: theme.palette.grey[500],
                      bgcolor: 'transparent'
                  }
              })
            : (defaultSX = {
                  color: theme.palette.grey[500],
                  bgcolor: theme.palette.grey[50],
                  ':hover': {
                      color: theme.palette.grey[500],
                      bgcolor: theme.palette.grey[50]
                  }
              });
    }

    let SX = defaultSX;
    if (variant === 'outlined') {
        SX = outlineSX;
    }
    SX = { ...SX, ...sx };
    return <MuiChip {...others} sx={SX} />;
};

export default Chip;
