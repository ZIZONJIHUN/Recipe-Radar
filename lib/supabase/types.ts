// 자동 생성된 Supabase 타입들이 여기에 들어갑니다
// supabase gen types typescript 명령어로 생성 가능

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // 여기에 테이블 타입 정의가 들어갑니다
      [_: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Views: {
      [_: string]: {
        Row: Record<string, unknown>
      }
    }
    Functions: {
      [_: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
    Enums: {
      [_: string]: unknown
    }
    CompositeTypes: {
      [_: string]: unknown
    }
  }
}