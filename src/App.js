import React, { useState, useEffect, useRef } from "react";
import dishes from "./dishes";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hi there! 👋 I'm your personal food recommendation assistant. I can help you find the perfect dish based on your preferences. Just tell me what you're in the mood for, or I can ask you some questions!",
      options: ["Ask me questions", "I'll describe what I want"]
    }
  ]);

  const [input, setInput] = useState("");
  const [preferences, setPreferences] = useState({
    type: null,
    cuisine: null,
    flavor: null,
    spiceLevel: null,
    mealType: null
  });
  const [conversationMode, setConversationMode] = useState("initial"); // initial, guided, freeform, complete
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NLP-like keyword extraction
  const extractPreferences = (text) => {
    const lower = text.toLowerCase();
    const extracted = {};

    // Type detection
    if (/(^|\s)(veg|vegetarian|veggie)(\s|$)/i.test(lower) && !/non.?veg/i.test(lower)) {
      extracted.type = "veg";
    } else if (/(^|\s)(non.?veg|meat|chicken|fish|seafood)(\s|$)/i.test(lower)) {
      extracted.type = "nonveg";
    }

    // Cuisine detection
    if (/indian|desi|curry|masala|biryani/i.test(lower)) {
      extracted.cuisine = "indian";
    } else if (/chinese|asian|manchurian|noodles|fried rice/i.test(lower)) {
      extracted.cuisine = "chinese";
    } else if (/italian|pizza|pasta|continental/i.test(lower)) {
      extracted.cuisine = "italian";
    } else if (/mexican|tacos|burrito/i.test(lower)) {
      extracted.cuisine = "mexican";
    } else if (/thai/i.test(lower)) {
      extracted.cuisine = "thai";
    }

    // Flavor detection
    if (/spicy|hot|chili|spice/i.test(lower)) {
      extracted.flavor = "spicy";
    } else if (/sweet|dessert|sugary/i.test(lower)) {
      extracted.flavor = "sweet";
    } else if (/savory|salty|umami/i.test(lower)) {
      extracted.flavor = "savory";
    } else if (/tangy|sour|citrus/i.test(lower)) {
      extracted.flavor = "tangy";
    } else if (/mild|bland|subtle/i.test(lower)) {
      extracted.flavor = "mild";
    }

    // Meal type detection
    if (/breakfast|morning/i.test(lower)) {
      extracted.mealType = "breakfast";
    } else if (/lunch|afternoon/i.test(lower)) {
      extracted.mealType = "lunch";
    } else if (/dinner|evening/i.test(lower)) {
      extracted.mealType = "dinner";
    } else if (/snack|light|appetizer/i.test(lower)) {
      extracted.mealType = "snack";
    }

    // Spice level
    if (/very spicy|extra hot|super spicy/i.test(lower)) {
      extracted.spiceLevel = "high";
    } else if (/medium spicy|moderately/i.test(lower)) {
      extracted.spiceLevel = "medium";
    } else if (/mild|not spicy|low spice/i.test(lower)) {
      extracted.spiceLevel = "low";
    }

    return extracted;
  };

  const findBestMatch = (prefs) => {
    let scored = dishes.map(dish => {
      let score = 0;
      
      if (prefs.type && dish.type === prefs.type) score += 3;
      if (prefs.cuisine && dish.cuisine === prefs.cuisine) score += 3;
      if (prefs.flavor && dish.flavor === prefs.flavor) score += 2;
      if (prefs.spiceLevel && dish.spiceLevel === prefs.spiceLevel) score += 1;
      if (prefs.mealType && dish.mealType === prefs.mealType) score += 1;

      return { dish, score };
    });

    scored.sort((a, b) => b.score - a.score);
    
    // Return top 3 matches
    return scored.slice(0, 3).filter(s => s.score > 0);
  };

  const botReply = (text, options = null, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text, options }]);
      setIsTyping(false);
    }, delay);
  };

  const handleGuidedQuestion = (currentPrefs) => {
    if (!currentPrefs.type) {
      botReply(
        "Let's start simple! Are you looking for vegetarian or non-vegetarian food? 🥗🍗",
        ["Vegetarian", "Non-Vegetarian"]
      );
    } else if (!currentPrefs.cuisine) {
      botReply(
        "Great choice! Which cuisine are you craving? 🌍",
        ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Surprise me!"]
      );
    } else if (!currentPrefs.flavor) {
      botReply(
        "Perfect! What kind of flavor profile sounds good? 😋",
        ["Spicy", "Sweet", "Savory", "Tangy", "Mild"]
      );
    } else {
      // All preferences gathered, find match
      findAndRecommend(currentPrefs);
    }
  };

  const findAndRecommend = (prefs) => {
    const matches = findBestMatch(prefs);
    
    if (matches.length > 0 && matches[0].score >= 3) {
      const topMatches = matches.filter(m => m.score === matches[0].score);
      
      if (topMatches.length === 1) {
        const dish = topMatches[0].dish;
        botReply(
          `Based on your preferences, I recommend:\n\n🍽️ **${dish.name}**\n\n${dish.description}\n\nWould you like another recommendation?`,
          ["Another recommendation", "Tell me more", "Show popular dishes", "Start over"],
          1500
        );
      } else {
        let text = "I found a few great options for you:\n\n";
        topMatches.forEach((m, i) => {
          text += `${i + 1}. **${m.dish.name}** - ${m.dish.description}\n\n`;
        });
        text += "Which one sounds most appealing?";
        
        botReply(text, topMatches.map(m => m.dish.name).concat(["Show popular dishes", "Start over"]), 1500);
      }
      setConversationMode("complete");
    } else if (matches.length > 0) {
      // Partial match - suggest anyway but ask for refinement
      const dish = matches[0].dish;
      botReply(
        `I don't have an exact match, but based on what you've told me, you might like:\n\n🍽️ **${dish.name}**\n\n${dish.description}\n\nWould you like to try something else?`,
        ["Another recommendation", "Show popular dishes", "Start over"],
        1500
      );
      setConversationMode("complete");
    } else {
      botReply(
        "I couldn't find a perfect match, but I'd love to help you explore other options! Want to try different preferences?",
        ["Show popular dishes", "Start over"],
        1500
      );
      setConversationMode("complete");
    }
  };

  const handleOptionClick = (option) => {
    const userMsg = { from: "user", text: option };
    setMessages(prev => [...prev, userMsg]);

    const lower = option.toLowerCase();

    // Initial mode handling
    if (conversationMode === "initial") {
      if (lower.includes("ask me questions")) {
        setConversationMode("guided");
        handleGuidedQuestion(preferences);
      } else if (lower.includes("describe")) {
        setConversationMode("freeform");
        botReply("Sure! Just describe what you're in the mood for. For example:\n\n• 'I want something spicy and vegetarian'\n• 'Craving Italian food for dinner'\n• 'Something light and tangy'\n\nJust type away! 😊");
      }
      return;
    }

    // Guided mode handling
    if (conversationMode === "guided") {
      let updated = { ...preferences };
      
      if (["vegetarian", "non-vegetarian"].includes(lower)) {
        updated.type = lower === "vegetarian" ? "veg" : "nonveg";
      } else if (["indian", "chinese", "italian", "mexican", "thai"].includes(lower)) {
        updated.cuisine = lower;
      } else if (lower === "surprise me!") {
        updated.cuisine = "any";
      } else if (["spicy", "sweet", "savory", "tangy", "mild"].includes(lower)) {
        updated.flavor = lower;
      }
      
      setPreferences(updated);
      handleGuidedQuestion(updated);
      return;
    }

    // Freeform mode handling
    if (conversationMode === "freeform") {
      let updated = { ...preferences };
      
      if (["vegetarian", "non-vegetarian"].includes(lower)) {
        updated.type = lower === "vegetarian" ? "veg" : "nonveg";
        setPreferences(updated);
        botReply("Got it! What else can you tell me about what you're craving?");
      } else if (lower.includes("popular")) {
        const popular = dishes.filter(d => d.isPopular).slice(0, 5);
        let text = "Here are our most popular dishes:\n\n";
        popular.forEach((d, i) => {
          text += `${i + 1}. **${d.name}** (${d.cuisine}) - ${d.description}\n\n`;
        });
        botReply(text, ["Start over", "I'll describe what I want"]);
      }
      return;
    }

    // Complete mode handling
    if (conversationMode === "complete") {
      if (lower.includes("another recommendation") || lower.includes("show me more")) {
        const allMatches = findBestMatch(preferences);
        if (allMatches.length > 1) {
          const nextDish = allMatches[1].dish;
          botReply(
            `How about this one:\n\n🍽️ **${nextDish.name}**\n\n${nextDish.description}`,
            ["Another recommendation", "Show popular dishes", "Start over"]
          );
        } else {
          botReply(
            "That was my best recommendation based on your preferences! Here are some other options:",
            ["Show popular dishes", "Start over"]
          );
        }
      } else if (lower.includes("start over")) {
        setPreferences({ type: null, cuisine: null, flavor: null, spiceLevel: null, mealType: null });
        setConversationMode("initial");
        botReply(
          "No problem! Let's start fresh. What would you like to do?",
          ["Ask me questions", "I'll describe what I want"]
        );
      } else if (lower.includes("popular")) {
        const popular = dishes.filter(d => d.isPopular).slice(0, 5);
        let text = "Here are our most popular dishes:\n\n";
        popular.forEach((d, i) => {
          text += `${i + 1}. **${d.name}** (${d.cuisine}) - ${d.description}\n\n`;
        });
        botReply(text, ["Start over", "I'll describe what I want"]);
      } else if (lower.includes("tell me more")) {
        const currentMatches = findBestMatch(preferences);
        if (currentMatches.length > 0) {
          const dish = currentMatches[0].dish;
          botReply(
            `**${dish.name}** is a wonderful choice! 🍽️\n\nCuisine: ${dish.cuisine.charAt(0).toUpperCase() + dish.cuisine.slice(1)}\nFlavor: ${dish.flavor.charAt(0).toUpperCase() + dish.flavor.slice(1)}\nSpice Level: ${dish.spiceLevel.charAt(0).toUpperCase() + dish.spiceLevel.slice(1)}\nBest for: ${dish.mealType.charAt(0).toUpperCase() + dish.mealType.slice(1)}\n\n${dish.description}`,
            ["Another recommendation", "Show popular dishes", "Start over"]
          );
        }
      } else {
        // Check if they selected a specific dish name
        const selectedDish = dishes.find(d => d.name.toLowerCase() === lower);
        if (selectedDish) {
          botReply(
            `Great choice! **${selectedDish.name}** 🍽️\n\n${selectedDish.description}\n\nWould you like to see more options?`,
            ["Another recommendation", "Show popular dishes", "Start over"]
          );
        }
      }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    const inputLower = input.toLowerCase();

    // Check for conversation control commands
    if (inputLower.includes("start over") || inputLower.includes("restart") || inputLower.includes("begin again")) {
      setPreferences({ type: null, cuisine: null, flavor: null, spiceLevel: null, mealType: null });
      setConversationMode("initial");
      botReply(
        "No problem! Let's start fresh. What would you like to do?",
        ["Ask me questions", "I'll describe what I want"]
      );
      setInput("");
      return;
    }

    if (inputLower.includes("popular") || inputLower.includes("trending") || inputLower.includes("best seller")) {
      const popular = dishes.filter(d => d.isPopular).slice(0, 5);
      let text = "Here are our most popular dishes:\n\n";
      popular.forEach((d, i) => {
        text += `${i + 1}. **${d.name}** (${d.cuisine}) - ${d.description}\n\n`;
      });
      botReply(text, ["Start over", "I'll describe what I want"]);
      setInput("");
      return;
    }

    // Extract preferences from free-form input
    const extracted = extractPreferences(input);
    const updated = { ...preferences, ...extracted };
    setPreferences(updated);

    // Check if we have enough info to recommend
    const hasEnoughInfo = updated.type || updated.cuisine || updated.flavor;

    if (conversationMode === "freeform" || conversationMode === "complete") {
      if (hasEnoughInfo) {
        findAndRecommend(updated);
      } else {
        // Ask clarifying questions with more guidance
        botReply(
          "I'd love to help! To give you the best recommendation, could you tell me a bit more? For example:\n\n• Are you looking for veg or non-veg?\n• What cuisine? (Indian, Chinese, Italian, Mexican, Thai)\n• What flavor? (Spicy, Sweet, Savory, Tangy)\n\nOr just describe what you're craving!",
          ["Vegetarian", "Non-Vegetarian", "Show popular dishes"]
        );
        setConversationMode("freeform");
      }
    } else if (conversationMode === "guided") {
      // In guided mode, treat text input as answering current question
      const updated = { ...preferences, ...extracted };
      setPreferences(updated);
      handleGuidedQuestion(updated);
    }

    setInput("");
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">🤖</div>
            <div>
              <h2>FoodBot Assistant</h2>
              <p className="status">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message-wrapper ${msg.from}`}>
              {msg.from === "bot" && <div className="message-avatar">🤖</div>}
              <div className={`message ${msg.from}`}>
                <div className="message-text">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line.includes('**') ? (
                        line.split('**').map((part, k) => 
                          k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                        )
                      ) : line}
                      <br />
                    </span>
                  ))}
                </div>
                {msg.options && (
                  <div className="options-container">
                    {msg.options.map((opt, j) => (
                      <button
                        key={j}
                        className="option-button"
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.from === "user" && <div className="message-avatar user">👤</div>}
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-avatar">🤖</div>
              <div className="message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-button">
            <span>Send</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;