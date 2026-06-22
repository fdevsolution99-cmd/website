import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

// Keep this component dependency-light to avoid export/runtime issues.
export default function ProjectCard({ title, description, image, tags, github, live }) {
  return (
    <Card
      sx={{
        height: 400,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Box sx={{ position: "relative", height: "60%", overflow: "hidden" }}>
        {image ? (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 70%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700} color="white" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="white" sx={{ opacity: 0.9, mb: 2 }}>
            {description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {live ? <Chip label="Live Demo" size="small" color="primary" /> : null}
            {github ? <Chip label="Source" size="small" color="secondary" /> : null}
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 3, pt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="primary">
            4.8 ★
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {Array.isArray(tags) && tags.length ? (
            tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" variant="outlined" color="primary" />
            ))
          ) : (
            <Typography variant="caption" color="text.secondary">
              -
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}


