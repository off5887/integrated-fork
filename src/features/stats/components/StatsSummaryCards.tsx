// src/features/stats/components/StatsSummaryCards.tsx
import { Box, Typography } from '@mui/material'

interface SummaryCard {
  label: string
  value: number | string
  unit: string
  color: string
}

interface Props {
  cards: SummaryCard[]
  cardBg: string
  borderColor: string
  cardShadow: string
  textSecondary: string
}

export default function StatsSummaryCards({ cards, cardBg, borderColor, cardShadow, textSecondary }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(6, 1fr)',
        },
        gap: { xs: 1.5, md: 2 },
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.label}
          sx={{
            bgcolor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
            boxShadow: cardShadow,
            p: { xs: 1.5, md: 2 },
            textAlign: 'center',
          }}
        >
          <Typography
            fontWeight={800}
            sx={{
              color: card.color,
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              lineHeight: 1.2,
            }}
          >
            {card.value}
            <Typography
              component="span"
              variant="caption"
              sx={{ color: textSecondary, ml: 0.3 }}
            >
              {card.unit}
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: textSecondary, display: 'block' }}
          >
            {card.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
