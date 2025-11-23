import * as React from "react"
import { Body, Container, Head, Html, Preview, Text, Button } from "@react-email/components"

export type TemplateData = {
  email: string
  reset_url: string
  to_name?: string
  preview_text?: string
  intro?: string
  body?: string
  button_text?: string
  signature?: string
  subject?: string
}

export const getTemplateName = () => "password-reset"

export const resolvePasswordResetSubject = (data?: TemplateData) => {
  const subjectFromData = typeof data?.subject === "string" ? data.subject.trim() : ""
  if (subjectFromData) {
    return subjectFromData
  }
  return process.env.MJ_PASSWORD_RESET_SUBJECT || "Reset Your Password"
}

export const buildPasswordResetTemplate = (data: TemplateData) => {
  const storeName = process.env.MJ_STORE_NAME || "Cyber Maker"
  const greetingName = data.to_name || "there"
  const greeting =
    data.intro || `Hi ${greetingName}, we received a request to reset your ${storeName} password.`
  const body =
    data.body ||
    "Click the button below to set a new password. If you didn’t request this, you can safely ignore this email."
  const signature = data.signature || `Thanks,<br />${storeName} Support`
  const preview = data.preview_text || process.env.MJ_PASSWORD_RESET_PREVIEW || "Reset your password"
  const btnText = data.button_text || "Reset Password"
  const resetUrl = data.reset_url

  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(Preview, null, preview),
    React.createElement(
      Body,
      {
        style: {
          backgroundColor: "#f7fafc",
          fontFamily: "Inter, Arial, sans-serif",
        },
      },
      React.createElement(
        Container,
        {
          style: {
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          },
        },
        React.createElement(
          Text,
          {
            style: {
              fontSize: "18px",
              lineHeight: "26px",
              marginBottom: "16px",
              color: "#1a202c",
            },
          },
          greeting
        ),
        React.createElement(
          Text,
          {
            style: {
              fontSize: "16px",
              lineHeight: "24px",
              marginBottom: "16px",
              color: "#4a5568",
            },
          },
          body
        ),
        React.createElement(Button, {
          href: resetUrl,
          style: {
            backgroundColor: "#1a56db",
            color: "#ffffff",
            padding: "12px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
          },
        }, btnText),
        React.createElement(
          Text,
          {
            style: {
              fontSize: "14px",
              lineHeight: "22px",
              marginBottom: "16px",
              color: "#718096",
            },
          },
          "If the button above doesn’t work, copy and paste this link into your browser:"
        ),
        React.createElement(
          Text,
          {
            style: {
              fontSize: "14px",
              lineHeight: "22px",
              marginBottom: "16px",
              color: "#1a202c",
              wordBreak: "break-all",
            },
          },
          resetUrl
        ),
        React.createElement(Text, {
          style: {
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "0",
            color: "#4a5568",
          },
          dangerouslySetInnerHTML: { __html: signature },
        })
      )
    )
  )
}

export const getPasswordResetTemplateConfig = () => {
  const templateName = getTemplateName()
  return {
    name: templateName,
    config: {
      subject: (_locale: string, templateData?: TemplateData) =>
        resolvePasswordResetSubject(templateData),
      template: (templateData: TemplateData) => buildPasswordResetTemplate(templateData),
    },
  }
}

