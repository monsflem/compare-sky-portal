export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          category_id: string
          created_at: string
          icon: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          category_id?: string
          created_at?: string
          icon?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          icon?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          component: string
          error_message: string
          log_id: string
          occurred_at: string
          resolved: boolean | null
          retry_count: number | null
        }
        Insert: {
          component: string
          error_message: string
          log_id?: string
          occurred_at?: string
          resolved?: boolean | null
          retry_count?: number | null
        }
        Update: {
          component?: string
          error_message?: string
          log_id?: string
          occurred_at?: string
          resolved?: boolean | null
          retry_count?: number | null
        }
        Relationships: []
      }
      provider_categories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          provider_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          provider_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          provider_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "provider_categories_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["provider_id"]
          },
        ]
      }
      provider_offers: {
        Row: {
          created_at: string
          description: string | null
          external_url: string | null
          features: Json | null
          is_active: boolean | null
          is_featured: boolean | null
          offer_id: string
          offer_name: string
          original_price: number | null
          price: number | null
          price_unit: string | null
          provider_id: string
          terms: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          features?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          offer_id?: string
          offer_name: string
          original_price?: number | null
          price?: number | null
          price_unit?: string | null
          provider_id: string
          terms?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          features?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          offer_id?: string
          offer_name?: string
          original_price?: number | null
          price?: number | null
          price_unit?: string | null
          provider_id?: string
          terms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_offers_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["provider_id"]
          },
        ]
      }
      providers: {
        Row: {
          affiliate_url: string | null
          created_at: string
          description: string | null
          last_updated: string
          logo_url: string | null
          name: string
          provider_id: string
          rating: number | null
          website_url: string
        }
        Insert: {
          affiliate_url?: string | null
          created_at?: string
          description?: string | null
          last_updated?: string
          logo_url?: string | null
          name: string
          provider_id?: string
          rating?: number | null
          website_url: string
        }
        Update: {
          affiliate_url?: string | null
          created_at?: string
          description?: string | null
          last_updated?: string
          logo_url?: string | null
          name?: string
          provider_id?: string
          rating?: number | null
          website_url?: string
        }
        Relationships: []
      }
      ta: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          offer_id: string | null
          provider_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          offer_id?: string | null
          provider_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          offer_id?: string | null
          provider_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "provider_offers"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "user_favorites_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["provider_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          favorites: Json | null
          full_name: string | null
          settings: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          favorites?: Json | null
          full_name?: string | null
          settings?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          favorites?: Json | null
          full_name?: string | null
          settings?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_reviews: {
        Row: {
          comment: string | null
          created_at: string
          provider_id: string
          rating: number
          review_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          provider_id: string
          rating: number
          review_id?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          provider_id?: string
          rating?: number
          review_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
