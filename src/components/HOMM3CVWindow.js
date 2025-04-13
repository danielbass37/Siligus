import React from 'react';
import styled from 'styled-components';

// Styled components for HOMM3 style
const HOMM3Container = styled.div`
  background-color: #000;
  color: #ffcd9a;
  font-family: 'Times New Roman', serif;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), 
                    url("https://wallpapercave.com/wp/wp7387328.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const HOMM3Header = styled.div`
  border: 2px solid #a06722;
  background: linear-gradient(to bottom, #382412, #241709);
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const HOMM3Title = styled.h1`
  color: #ffcd9a;
  font-size: 28px;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 1px 1px 2px #000;
  letter-spacing: 2px;
`;

const HOMM3Section = styled.div`
  border: 2px solid #a06722;
  background: linear-gradient(to bottom, #382412, #241709);
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const HOMM3SectionTitle = styled.h2`
  color: #ffea89;
  font-size: 22px;
  border-bottom: 1px solid #a06722;
  padding-bottom: 8px;
  margin-top: 0;
  margin-bottom: 15px;
`;

const HOMM3List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const HOMM3ListItem = styled.li`
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
  
  &:before {
    content: "➤";
    position: absolute;
    left: 0;
    color: #d4af37;
  }
`;

const HOMM3Skill = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HOMM3SkillName = styled.span`
  color: #ffea89;
`;

const HOMM3SkillLevel = styled.div`
  display: flex;
  align-items: center;
`;

const HOMM3SkillIcon = styled.span`
  color: #d4af37;
  font-size: 16px;
  margin-right: 3px;
`;

const HOMM3CVWindow = () => {
  const renderSkillLevel = (level) => {
    const maxLevel = 5;
    const stars = [];
    
    for (let i = 0; i < maxLevel; i++) {
      stars.push(
        <HOMM3SkillIcon key={i}>
          {i < level ? '★' : '☆'}
        </HOMM3SkillIcon>
      );
    }
    
    return stars;
  };
  
  return (
    <HOMM3Container>
      <HOMM3Header>
        <HOMM3Title>Daniel Bass - Product Marketing Manager</HOMM3Title>
      </HOMM3Header>
      
      <HOMM3Section>
        <HOMM3SectionTitle>Hero Stats</HOMM3SectionTitle>
        <HOMM3Skill>
          <HOMM3SkillName>Product Marketing</HOMM3SkillName>
          <HOMM3SkillLevel>{renderSkillLevel(5)}</HOMM3SkillLevel>
        </HOMM3Skill>
        <HOMM3Skill>
          <HOMM3SkillName>Developer Marketing</HOMM3SkillName>
          <HOMM3SkillLevel>{renderSkillLevel(4)}</HOMM3SkillLevel>
        </HOMM3Skill>
        <HOMM3Skill>
          <HOMM3SkillName>Technical Content Writing</HOMM3SkillName>
          <HOMM3SkillLevel>{renderSkillLevel(5)}</HOMM3SkillLevel>
        </HOMM3Skill>
        <HOMM3Skill>
          <HOMM3SkillName>Community Building</HOMM3SkillName>
          <HOMM3SkillLevel>{renderSkillLevel(4)}</HOMM3SkillLevel>
        </HOMM3Skill>
        <HOMM3Skill>
          <HOMM3SkillName>Video Production</HOMM3SkillName>
          <HOMM3SkillLevel>{renderSkillLevel(4)}</HOMM3SkillLevel>
        </HOMM3Skill>
      </HOMM3Section>
      
      <HOMM3Section>
        <HOMM3SectionTitle>Quest Log (Experience)</HOMM3SectionTitle>
        <HOMM3List>
          <HOMM3ListItem>Product Marketing Manager at Permit.io (Current Quest)</HOMM3ListItem>
          <HOMM3ListItem>Technical Marketing Content Writer at XYZ Company</HOMM3ListItem>
          <HOMM3ListItem>Developer Marketing Specialist at ABC Tech</HOMM3ListItem>
          <HOMM3ListItem>Content Strategist at DEF Solutions</HOMM3ListItem>
        </HOMM3List>
      </HOMM3Section>
      
      <HOMM3Section>
        <HOMM3SectionTitle>Magical Artifacts (Skills)</HOMM3SectionTitle>
        <HOMM3List>
          <HOMM3ListItem>Product Positioning & Messaging</HOMM3ListItem>
          <HOMM3ListItem>Developer Advocacy & Evangelism</HOMM3ListItem>
          <HOMM3ListItem>Technical Content Creation</HOMM3ListItem>
          <HOMM3ListItem>Video Scriptwriting & Production</HOMM3ListItem>
          <HOMM3ListItem>Community Engagement</HOMM3ListItem>
          <HOMM3ListItem>Market Research & Competitive Analysis</HOMM3ListItem>
          <HOMM3ListItem>Campaign Management</HOMM3ListItem>
        </HOMM3List>
      </HOMM3Section>
      
      <HOMM3Section>
        <HOMM3SectionTitle>Townships (Education)</HOMM3SectionTitle>
        <HOMM3List>
          <HOMM3ListItem>Masters in Marketing Communications, University of Excellence</HOMM3ListItem>
          <HOMM3ListItem>Bachelor of Arts in Technical Communications, College of Wisdom</HOMM3ListItem>
        </HOMM3List>
      </HOMM3Section>
    </HOMM3Container>
  );
};

export default HOMM3CVWindow; 