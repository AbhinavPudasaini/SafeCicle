import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const CommunityPosts = () => {
  const [selectedTab, setSelectedTab] = useState('All Posts');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const tabs = [
    { name: 'All Posts', count: 2 },
    { name: 'Questions', count: 1 },
    { name: 'Problems', count: 1 },
    { name: 'Suggestions', count: 0 },
  ];

  const handleSendComment = () => {
    if (commentText.trim()) {
      console.log('Sending comment:', commentText);
      setCommentText('');
    }
  };

  const TabButton = ({ tab, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        isSelected && styles.tabButtonSelected,
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.tabText,
        isSelected && styles.tabTextSelected,
      ]}>
        {tab.name}
      </Text>
      {tab.count > 0 && (
        <View style={[
          styles.tabBadge,
          isSelected && styles.tabBadgeSelected,
        ]}>
          <Text style={[
            styles.tabBadgeText,
            isSelected && styles.tabBadgeTextSelected,
          ]}>
            {tab.count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Community Posts</Text>
        <Text style={styles.headerSubtitle}>2 posts from the community</Text>
      </View>

      {/* Tabs */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}> */}
        <View style={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              tab={tab}
              isSelected={selectedTab === tab.name}
              onPress={() => setSelectedTab(tab.name)}
            />
          ))}
        </View>
      {/* </ScrollView> */}

      {/* Sort Option */}
      <TouchableOpacity style={styles.sortContainer}>
        <Text style={styles.sortIcon}>🔀</Text>
        <Text style={styles.sortText}>Sort by Votes</Text>
      </TouchableOpacity>

      <ScrollView style={styles.postsContainer}>
        {/* Post Card */}
        <View style={styles.postCard}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <View style={styles.postTags}>
              <View style={styles.questionTag}>
                <Text style={styles.questionTagText}>❓ Question</Text>
              </View>
              <View style={styles.visitorTag}>
                <Text style={styles.visitorTagText}>✈️ Visitor</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.moreIcon}>⋯</Text>
            </TouchableOpacity>
          </View>

          {/* Post Title */}
          <Text style={styles.postTitle}>Best local coffee shops near downtown?</Text>
          <Text style={styles.voteCount} onPress={() => {}}>12</Text>

          {/* Post Preview */}
          <Text style={styles.postPreview}>
            Looking for authentic local coffee experiences, not chain stores. Any hidden gems?
          </Text>

          {/* Post Meta */}
          <View style={styles.postMeta}>
            <View style={styles.postMetaLeft}>
              <Text style={styles.postDate}>📅 15/01/2024</Text>
              <Text style={styles.commentCount}>💬 1 comment</Text>
            </View>
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={styles.showLessMore}>
                {showFullDescription ? 'Show Less' : 'Show More'} ▼
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Description (Expandable) */}
          {showFullDescription && (
            <View style={styles.fullDescriptionContainer}>
              <Text style={styles.fullDescriptionTitle}>Full Description</Text>
              <Text style={styles.fullDescriptionText}>
                Looking for authentic local coffee experiences, not chain stores. Any hidden gems?
              </Text>

              {/* Comments Section */}
              <TouchableOpacity 
                style={styles.commentsToggle}
                onPress={() => setShowComments(!showComments)}
              >
                <Text style={styles.commentsToggleText}>💬 Comments (1)</Text>
              </TouchableOpacity>

              {showComments && (
                <View style={styles.commentsSection}>
                  {/* Comment */}
                  <View style={styles.comment}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentAvatar}>
                        <Text style={styles.commentAvatarText}>L</Text>
                      </View>
                      <View style={styles.commentMeta}>
                        <Text style={styles.commentAuthor}>LocalCoffeeExpert</Text>
                        <Text style={styles.commentDate}>📅 14/01/2024</Text>
                      </View>
                    </View>
                    <Text style={styles.commentText}>
                      Try Brew & Bean on 5th Street - amazing espresso!
                    </Text>
                  </View>

                  {/* Comment Input */}
                  <View style={styles.commentInputContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Share your thoughts..."
                      value={commentText}
                      onChangeText={setCommentText}
                      multiline
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity 
                      style={styles.sendButton}
                      onPress={handleSendComment}
                    >
                      <Text style={styles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Footer */}
                  <View style={styles.commentFooter}>
                    <TouchableOpacity>
                      <Text style={styles.footerLink}>Press Enter • Shift Enter to new line</Text>
                    </TouchableOpacity>
                    <Text style={styles.characterCount}>0/500</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsWrapper: {
    flexDirection: 'row',
    flexWrap:"wrap",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width:350,
    height:100,
    margin:10,
    padding:20,
    gap:10
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  tabButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 4,
  },
  tabTextSelected: {
    color: 'white',
  },
  tabBadge: {
    backgroundColor: '#D1D5DB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  tabBadgeTextSelected: {
    color: 'white',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  sortIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sortText: {
    fontSize: 14,
    color: '#6B7280',
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
  },
  questionTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionTagText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  visitorTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  visitorTagText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
  },
  moreIcon: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
  },
  voteCount: {
    position: 'absolute',
    right: 16,
    top: 60,
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
  postPreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postMetaLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  postDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  showLessMore: {
    fontSize: 12,
    color: '#6B7280',
  },
  fullDescriptionContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fullDescriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  fullDescriptionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  commentsToggle: {
    paddingVertical: 8,
    marginBottom: 12,
  },
  commentsToggleText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  commentsSection: {
    marginTop: 8,
  },
  comment: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  commentMeta: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  commentDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginLeft: 44,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    maxHeight: 100,
    paddingVertical: 0,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default CommunityPosts;