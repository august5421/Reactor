import React, { useEffect, useState } from "react";
import { Box, Typography, CardContent, CardMedia, Divider, Chip, IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentByField, getDocumentById, updateDocument } from "../services/FirestoreService";
import { setActiveBlogPost, setAlert } from "../actions/actions";
import { useParams } from "react-router";

function SingleBlogPostPage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  const siteColors = useSelector((state) => state.siteColors);
  const activeBlogPost = useSelector((state) => state.activeBlogPost);
  const activeUser = useSelector((state) => state.activeUser);
  const onDashboard = useSelector((state) => state.onDashboard);

  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [postToRender, setPostToRender] = useState(null);
  const slug = useParams();

  useEffect(() => {
    if (activeBlogPost?.id) {
      fetchBlogPostData();
    } else {
      fetchBlogPostDataFromTitle();
    }
  }, []);

  const fetchBlogPostDataFromTitle = async () => {
    try {
        const blogPost = await getDocumentByField('Blog', 'title', slug.postTitle.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()))
        if (blogPost) {
            setLikesCount(blogPost.impressions?.length || 0);
            setHasLiked(
                blogPost.impressions?.some((impression) => impression.email === activeUser?.email) || false
            );
        }
        setPostToRender(blogPost[0])
    } catch (error) {
        console.error("Error fetching blog post data:", error);
    }
  };

  const fetchBlogPostData = async () => {
    try {
      const blogPost = await getDocumentById("Blog", activeBlogPost.id);
      if (blogPost) {
        setLikesCount(blogPost.impressions?.length || 0);
        setHasLiked(
          blogPost.impressions?.some((impression) => impression.email === activeUser?.email) || false
        );
      }
      setPostToRender(activeBlogPost)
    } catch (error) {
      console.error("Error fetching blog post data:", error);
    }
  };

  const handleLike = async () => {
    if (!activeUser?.email) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', "You must be logged in to like this post."));
      return;
    }

    try {
        const updatedImpressions = hasLiked
        ? (postToRender?.impressions || []).filter(
            (impression) => impression.email !== activeUser.email
          )
        : [
            ...(postToRender?.impressions || []),
            activeUser,
          ];      

      await updateDocument("Blog", postToRender?.id, { impressions: updatedImpressions });

      setHasLiked(!hasLiked);
      setLikesCount(updatedImpressions.length);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  
  return (
    <Box
      sx={{
        minHeight: isMobile ? "calc(100vh - 56px - 4rem)" : "calc(100vh - 64px - 4rem)",
        width: "calc(100vw - 4rem)",
        padding: "2rem 2rem",
        backgroundColor: siteColors.pages_blog,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1050px', margin: 'auto' }}>
        <Box sx={{ position: "relative" }}>
            <CardMedia
            component="img"
            height="300"
            image={postToRender?.headerImage}
            alt={postToRender?.title}
            />
            <Chip
            label={postToRender?.category}
            sx={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                fontWeight: "bold",
            }}
            />
        </Box>
        <CardContent>
            <Typography variant="h4" gutterBottom sx={{color: siteColors.blog_title}}>
            {postToRender?.title}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" color="text.secondary">
                By: {postToRender?.author}
            </Typography>
            </Box>
            <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
            <Typography variant="caption" color="text.secondary">
                {postToRender?.date}
            </Typography>
            <Box>
                <Tooltip title={hasLiked ? "Unlike this post" : "Like this post"}>
                <IconButton onClick={handleLike} color="primary">
                    {hasLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                </Tooltip>
                <Typography variant="caption" sx={{ marginLeft: "0.5rem" }}>
                {likesCount} {likesCount === 1 ? "like" : "likes"}
                </Typography>
            </Box>
            </Box>
            <Divider sx={{ margin: "1rem 0" }} />
            <Typography variant="body1" paragraph>
            {postToRender?.body}
            </Typography>
        </CardContent>
      </Box>
    </Box>
  );
}

export default SingleBlogPostPage;
