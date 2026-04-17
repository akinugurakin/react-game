from datetime import datetime

from pydantic import BaseModel, Field


class GameSessionCreate(BaseModel):
    score: int = Field(ge=0)
    correct_count: int = Field(ge=0, default=0)
    wrong_count: int = Field(ge=0, default=0)
    duration_seconds: int = Field(ge=0)
    platform: str = "web"  # web | tablet | board


class GameSessionResponse(BaseModel):
    id: int
    student_id: int
    game_id: str
    score: int
    correct_count: int
    wrong_count: int
    duration_seconds: int
    platform: str
    completed_at: datetime

    model_config = {"from_attributes": True}


class LeaderboardEntry(BaseModel):
    display_name: str
    avatar: str
    score: int
    correct_count: int
    duration_seconds: int
    completed_at: datetime
